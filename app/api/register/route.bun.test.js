import { describe, expect, it, mock, beforeEach } from "bun:test";
import { POST } from "./route.js";

class MockRequest {
  constructor(url, init) {
    this.url = url;
    this.init = init;
    this.headers = { get: () => Math.random().toString(),
      get: (key) => this.init?.headers?.[key] || null
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

let mockFindFirst = async () => null;
let mockCreate = async (args) => ({ id: 'mock-id' });

mock.module('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: async (args) => mockFindFirst(args),
      create: async (args) => mockCreate(args)
    }
  }
}));

mock.module('bcryptjs', () => ({
  default: {
    hash: async () => 'hashed'
  }
}));

describe("Register API Main Route", () => {
  beforeEach(() => {
    mockFindFirst = async () => null;
    mockCreate = async (args) => ({ id: 'mock-id' });
  });

  it("should return 400 if email is missing", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Email and password are required");
  });

  it("should return 400 if password is missing", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Email and password are required");
  });

  it("should return 400 if email is already registered", async () => {
    mockFindFirst = async () => ({ id: "existing-id", email: "test@example.com" });
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Email already registered");
  });

  it("should return 201 on successful registration", async () => {
    const req = new MockRequest("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ name: "Test", email: "test@example.com", password: "Password123!" }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.message).toBe("Account created successfully");
    expect(data.userId).toBe("mock-id");
  });

  it("should pass name, email, and hashed password to prisma.user.create", async () => {
      let createArgs = null;
      mockCreate = async (args) => {
          createArgs = args;
          return { id: 'mock-id' };
      };

      const req = new MockRequest("http://localhost/api/register", {
        method: "POST",
        body: JSON.stringify({ name: "TestName", email: "test@example.com", password: "Password123!" }),
        headers: { "Content-Type": "application/json" }
      });
      await POST(req);

      expect(createArgs).not.toBeNull();
      expect(createArgs.data.name).toBe("TestName");
      expect(createArgs.data.email).toBe("test@example.com");
      expect(createArgs.data.password).toBe("hashed");
  });
});
