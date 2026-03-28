import { describe, expect, it, mock, beforeEach } from "bun:test";
import { POST } from "./route.js";

class MockRequest {
  constructor(url, init) {
    this.url = url;
    this.init = init;
    this.headers = {
      get: (key) => init.headers?.[key] || null
    };
  }
  async json() {
    return JSON.parse(this.init.body);
  }
}

mock.module('next/server', () => ({
  NextResponse: {
    json: (body, init) => ({
      status: init?.status || 200,
      json: async () => body
    })
  }
}));

mock.module('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: async () => null,
      create: async () => ({ id: 'mock-id' })
    }
  }
}));

mock.module('bcryptjs', () => ({
  default: {
    hash: async () => 'hashed'
  }
}));

describe("Registration Rate Limiting", () => {
  it("should block requests after exceeding the rate limit", async () => {
    const makeRequest = async () => {
      const req = new MockRequest("http://localhost/api/register", {
        method: "POST",
        body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password123!" }),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "192.168.1.1"
        }
      });
      return await POST(req);
    };

    // Make 5 successful requests
    for (let i = 0; i < 5; i++) {
      const res = await makeRequest();
      expect(res.status).toBe(201);
    }

    // The 6th request should be rate limited
    const res = await makeRequest();
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe("Too many registration attempts from this IP, please try again after 15 minutes");
  });
});
