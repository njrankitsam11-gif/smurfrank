import { describe, expect, it, mock } from "bun:test";
import { POST } from "./route.js";

// Mock the Next.js Request object since it might not be fully available
let reqCounter = 0;
class MockRequest {
  constructor(url, init) {
    this.url = url;
    this.init = init;
    this.headers = { get: () => Math.random().toString(),
      get: (key) => key === 'x-forwarded-for' ? 'test-ip-' + (++reqCounter) : (init.headers?.[key] || null)
    };
  }
  async json() {
    return JSON.parse(this.init.body);
  }
}

// Ensure the NextResponse object exists in the Next/Server module mock
mock.module('next/server', () => ({
  NextResponse: {
    json: (body, init) => ({
      status: init?.status || 200,
      json: async () => body
    })
  }
}));

// Provide basic mocks for the route handler dependencies
mock.module('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: async () => null,
      create: async () => ({ id: 'mock-id' })
    }
  }
}));

mock.module('bcryptjs', () => ({
  default: {
    hash: async () => 'hashed'
  }
}));


describe("Email format validation", () => {
  it("should reject an email without an @ symbol", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test.com", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email format");
  });

  it("should reject an email without a domain", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email format");
  });

  it("should reject an email without a top level domain", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@domain", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email format");
  });

  it("should accept a valid email", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
  });
});
