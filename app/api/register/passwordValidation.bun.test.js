import { describe, expect, it, mock } from "bun:test";
import { POST } from "./route.js";

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

describe("Password complexity validation", () => {
  it("should reject a password with less than 8 characters", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Short1!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Password must be at least 8 characters long, and include uppercase, lowercase, a digit, and a special character");
  });

  it("should reject a password without an uppercase letter", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should reject a password without a lowercase letter", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "PASSWORD123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should reject a password without a digit", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should reject a password without a special character", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password123" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should accept a valid complex password", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
  });
});
