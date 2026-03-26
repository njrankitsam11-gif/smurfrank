import { expect, test, describe, mock } from "bun:test";

const mockPrisma = {
  user: {
    findUnique: mock(),
    create: mock(),
  },
};

// Mocking dependencies BEFORE importing the actual POST handler
mock.module("../../../lib/prisma", () => ({
  prisma: mockPrisma,
}));

// Mocking bcryptjs which is missing in node_modules
mock.module("bcryptjs", () => ({
  default: {
    hash: mock(() => Promise.resolve("hashed_password")),
  },
}));

mock.module("next/server", () => ({
  NextResponse: {
    json: mock((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
    })),
  },
}));

// Import the ACTUAL handler from the codebase
import { POST } from "./route";

describe("Register API (Production Code)", () => {
  const createRequest = (body) => ({
    json: () => Promise.resolve(body),
  });

  test("should return 400 if email or password is missing", async () => {
    const req = createRequest({ name: "Test" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Email and password are required");
  });

  test("should return 400 if password is too short", async () => {
    const req = createRequest({ email: "test@example.com", password: "123" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Password must be at least 6 characters");
  });

  test("should return 400 if email is already registered", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce({ id: 1, email: "test@example.com" });
    const req = createRequest({ email: "test@example.com", password: "password123" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Email already registered");
  });

  test("should return 201 on successful registration", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(null);
    mockPrisma.user.create.mockResolvedValueOnce({ id: "user_123" });
    const req = createRequest({ name: "Test", email: "new@example.com", password: "password123" });
    const res = await POST(req);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.message).toBe("Account created successfully");
    expect(data.userId).toBe("user_123");
  });

  test("should return 500 when prisma.user.create fails", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(null);
    mockPrisma.user.create.mockRejectedValueOnce(new Error("Database error"));
    const req = createRequest({ name: "Test", email: "error@example.com", password: "password123" });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Something went wrong");
  });
});
