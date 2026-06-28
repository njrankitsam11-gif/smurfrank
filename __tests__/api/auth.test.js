import NextAuth from 'next-auth';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';

jest.mock('next-auth', () => jest.fn());
jest.mock('next-auth/providers/credentials', () => jest.fn((options) => options));
jest.mock('../../lib/prisma', () => ({
  prisma: {
    user: { findFirst: jest.fn() }
  }
}));
jest.mock('bcryptjs', () => ({
  compare: jest.fn()
}));

describe('NextAuth Configuration', () => {
  let authOptions;

  beforeAll(() => {
    // Import the route to trigger the NextAuth call
    require('../../app/api/auth/[...nextauth]/route');
    authOptions = NextAuth.mock.calls[0][0];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('CredentialsProvider authorize', () => {
    let authorize;

    beforeAll(() => {
      authorize = authOptions.providers[0].authorize;
    });

    it('returns null if credentials are not provided', async () => {
      const result = await authorize(undefined);
      expect(result).toBeNull();
    });

    it('returns null if email is missing', async () => {
      const result = await authorize({ password: 'password123' });
      expect(result).toBeNull();
    });

    it('returns null if password is missing', async () => {
      const result = await authorize({ email: 'test@example.com' });
      expect(result).toBeNull();
    });

    it('returns null if user is not found', async () => {
      prisma.user.findFirst.mockResolvedValueOnce(null);
      const result = await authorize({ email: 'test@example.com', password: 'password123' });
      expect(result).toBeNull();
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        mode: 'insensitive'
      });
    });

    it('returns null if password does not match', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword', name: 'Test User', role: 'USER' };
      prisma.user.findFirst.mockResolvedValueOnce(mockUser);
      bcrypt.compare.mockResolvedValueOnce(false);

      const result = await authorize({ email: 'test@example.com', password: 'wrongpassword' });
      expect(result).toBeNull();
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedPassword');
    });

    it('returns user object if authorization is successful', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword', name: 'Test User', role: 'USER' };
      prisma.user.findFirst.mockResolvedValueOnce(mockUser);
      bcrypt.compare.mockResolvedValueOnce(true);

      const result = await authorize({ email: 'test@example.com', password: 'password123' });
      expect(result).toEqual({ id: 1, email: 'test@example.com', name: 'Test User', role: 'USER' });
    });
  });

  describe('Callbacks', () => {
    describe('jwt', () => {
      it('adds user id and role to token if user is provided', async () => {
        const token = { existingProp: 'value' };
        const user = { id: 1, role: 'ADMIN' };

        const result = await authOptions.callbacks.jwt({ token, user });
        expect(result).toEqual({ existingProp: 'value', id: 1, role: 'ADMIN' });
      });

      it('returns existing token if user is not provided', async () => {
        const token = { existingProp: 'value' };

        const result = await authOptions.callbacks.jwt({ token });
        expect(result).toEqual({ existingProp: 'value' });
      });
    });

    describe('session', () => {
      it('adds token id and role to session user if token is provided', async () => {
        const session = { user: { existingProp: 'value' } };
        const token = { id: 1, role: 'ADMIN' };

        const result = await authOptions.callbacks.session({ session, token });
        expect(result).toEqual({ user: { existingProp: 'value', id: 1, role: 'ADMIN' } });
      });

      it('does not crash if token is missing', async () => {
        const session = { user: { existingProp: 'value' } };

        const result = await authOptions.callbacks.session({ session, token: null });
        expect(result).toEqual({ user: { existingProp: 'value' } });
      });
    });
  });
});
