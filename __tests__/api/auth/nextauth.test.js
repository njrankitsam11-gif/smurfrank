import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

// Mock the prisma client and bcryptjs
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

// Create a mock for next-auth and capture the options passed to NextAuth
let nextAuthOptions;
jest.mock('next-auth', () => {
  return jest.fn((options) => {
    nextAuthOptions = options;
    return {};
  });
});

jest.mock('next-auth/providers/credentials', () => {
  return jest.fn((options) => options);
});

// Require the route file to trigger NextAuth
require('../../../app/api/auth/[...nextauth]/route');

describe('NextAuth Configuration', () => {
  let authorize;
  let jwt;
  let sessionCallback;

  beforeAll(() => {
    authorize = nextAuthOptions.providers[0].authorize;
    jwt = nextAuthOptions.callbacks.jwt;
    sessionCallback = nextAuthOptions.callbacks.session;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('CredentialsProvider authorize', () => {
    it('should return null if credentials are not provided', async () => {
      expect(await authorize(null)).toBeNull();
      expect(await authorize({ email: 'test@example.com' })).toBeNull();
      expect(await authorize({ password: 'password' })).toBeNull();
    });

    it('should return null if user is not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await authorize({ email: 'test@example.com', password: 'password' });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      bcrypt.compare.mockResolvedValue(false);

      const result = await authorize({ email: 'test@example.com', password: 'wrongPassword' });

      expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
      expect(result).toBeNull();
    });

    it('should return user object if credentials are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        role: 'USER',
      };
      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const result = await authorize({ email: 'test@example.com', password: 'correctPassword' });

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
      });
    });
  });

  describe('callbacks', () => {
    describe('jwt', () => {
      it('should add user role and id to token if user is provided', async () => {
        const token = { name: 'Test User' };
        const user = { id: 1, role: 'ADMIN' };

        const result = await jwt({ token, user });

        expect(result).toEqual({
          name: 'Test User',
          role: 'ADMIN',
          id: 1,
        });
      });

      it('should return existing token if no user is provided', async () => {
        const token = { name: 'Test User', role: 'USER', id: 2 };

        const result = await jwt({ token });

        expect(result).toEqual({
          name: 'Test User',
          role: 'USER',
          id: 2,
        });
      });
    });

    describe('session', () => {
      it('should add token role and id to session user if token is provided', async () => {
        const session = { user: { name: 'Test User' } };
        const token = { role: 'ADMIN', id: 1 };

        const result = await sessionCallback({ session, token });

        expect(result.user).toEqual({
          name: 'Test User',
          role: 'ADMIN',
          id: 1,
        });
      });

      it('should return session unmodified if no token is provided', async () => {
        const session = { user: { name: 'Test User' } };

        const result = await sessionCallback({ session });

        expect(result).toEqual({
          user: { name: 'Test User' },
        });
      });
    });
  });
});
