import { describe, expect, it, mock, afterEach } from "bun:test";
import { POST } from "./route.js";

class MockRequest {
  constructor(url, init) {
    this.url = url;
    this.init = init;
    this.headers = { get: () => Math.random().toString() };
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
let mockCreate = async () => { throw new Error('Database connection failed'); };

mock.module('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: async (...args) => mockFindFirst(...args),
      create: async (...args) => mockCreate(...args)
    }
  }
}));

let mockHash = async () => 'hashed';

mock.module('bcryptjs', () => ({
  default: {
    hash: async (...args) => mockHash(...args)
  }
}));

describe("Register API Error Handling", () => {
  afterEach(() => {
    // Reset mocks to default behavior between tests
    mockFindFirst = async () => null;
    mockCreate = async () => { throw new Error('Database connection failed'); };
    mockHash = async () => 'hashed';
  });

  it("should return a 500 error if an unexpected error occurs during user creation", async () => {
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

  it("should return a 500 error if finding unique user fails", async () => {
    mockFindFirst = async () => { throw new Error('Database error during find'); };
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

  it("should return a 500 error if password hashing fails", async () => {
    mockHash = async () => { throw new Error('Hashing error'); };
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

  it("should return a 500 error if parsing request body fails", async () => {
    const req = {
      headers: { get: () => Math.random().toString() },
      json: async () => { throw new SyntaxError("Unexpected token"); }
    };
    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Something went wrong");
  });

  it("should return a 500 error if a Prisma unique constraint violation occurs during user creation", async () => {
    mockCreate = async () => {
      const error = new Error('Unique constraint failed');
      error.code = 'P2002';
      throw error;
    };
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
