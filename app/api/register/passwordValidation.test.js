import { expect, test, describe } from "bun:test";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

describe("Password Complexity Validation", () => {
  test("should accept valid passwords with various special characters", () => {
    expect(passwordRegex.test("Password123!")).toBe(true);
    expect(passwordRegex.test("Strong#Pass1")).toBe(true);
    expect(passwordRegex.test("User_123$")).toBe(true);
    expect(passwordRegex.test("Admin(2024)*")).toBe(true);
    expect(passwordRegex.test("Pass with space 1!")).toBe(true);
  });

  test("should reject short passwords", () => {
    expect(passwordRegex.test("P1!a2s3")).toBe(false);
  });

  test("should reject passwords without uppercase", () => {
    expect(passwordRegex.test("password123!")).toBe(false);
  });

  test("should reject passwords without lowercase", () => {
    expect(passwordRegex.test("PASSWORD123!")).toBe(false);
  });

  test("should reject passwords without numbers", () => {
    expect(passwordRegex.test("Password!")).toBe(false);
  });

  test("should reject passwords without special characters", () => {
    expect(passwordRegex.test("Password123")).toBe(false);
  });
});
