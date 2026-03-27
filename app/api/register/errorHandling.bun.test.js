import { describe, expect, it, mock } from "bun:test";
import { POST } from "./route.js";

class MockRequest {
  constructor(url, init) {
    this.url = url;
    this.init = init;
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
      create: async () => { throw new Error('Database connection failed'); }
    }
  }
}));

mock.module('bcryptjs', () => ({
  default: {
    hash: async () => 'hashed'
  }
}));

describe("Register API Error Handling", () => {
  it("should return a 500 error if an unexpected error occurs", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Something went wrong");
  });
});
