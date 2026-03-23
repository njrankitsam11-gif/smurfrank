const mockPrismaClient = jest.fn().mockImplementation(() => ({
  _mocked: true,
}));

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: mockPrismaClient,
  };
});

describe('Prisma Client Singleton', () => {
  let originalEnv;

  beforeEach(() => {
    // Save original NODE_ENV
    originalEnv = process.env.NODE_ENV;

    // Clear the module cache so we can re-evaluate lib/prisma.js
    jest.resetModules();

    // Reset globalForPrisma.prisma
    delete globalThis.prisma;

    // Clear mock data
    mockPrismaClient.mockClear();
  });

  afterEach(() => {
    // Restore original NODE_ENV
    process.env.NODE_ENV = originalEnv;

    // Clean up globalThis.prisma
    delete globalThis.prisma;
  });

  it('instantiates a new PrismaClient when globalThis.prisma is undefined', () => {
    // Ensure NODE_ENV is something other than 'production' or undefined for this test
    process.env.NODE_ENV = 'test';

    const { prisma } = require('../../lib/prisma');

    expect(mockPrismaClient).toHaveBeenCalledTimes(1);
    expect(prisma).toBeDefined();
    expect(prisma._mocked).toBe(true);
  });

  it('reuses existing PrismaClient from globalThis.prisma', () => {
    const existingPrisma = { _mocked: 'existing' };
    globalThis.prisma = existingPrisma;

    const { prisma } = require('../../lib/prisma');

    // Should not instantiate a new one
    expect(mockPrismaClient).not.toHaveBeenCalled();
    // Should return the one from globalThis
    expect(prisma).toBe(existingPrisma);
  });

  it('assigns to globalThis.prisma when not in production', () => {
    process.env.NODE_ENV = 'development';

    const { prisma } = require('../../lib/prisma');

    // globalThis.prisma should be assigned the instance
    expect(globalThis.prisma).toBeDefined();
    expect(globalThis.prisma).toBe(prisma);
  });

  it('does NOT assign to globalThis.prisma in production', () => {
    process.env.NODE_ENV = 'production';

    require('../../lib/prisma');

    // globalThis.prisma should not be assigned
    expect(globalThis.prisma).toBeUndefined();
  });
});