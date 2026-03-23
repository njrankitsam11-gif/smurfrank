import { authOptions } from '../../../../app/api/auth/[...nextauth]/authOptions';

describe('NextAuth Callbacks', () => {
  const { jwt, session } = authOptions.callbacks;

  describe('jwt callback', () => {
    it('should add user role and id to token when user is provided', async () => {
      const token = { name: 'Test User' };
      const user = { id: 'user-id', role: 'admin' };

      const result = await jwt({ token, user });

      expect(result).toEqual({
        name: 'Test User',
        id: 'user-id',
        role: 'admin',
      });
    });

    it('should return token unchanged when user is not provided', async () => {
      const token = { name: 'Test User', id: 'user-id', role: 'admin' };

      const result = await jwt({ token });

      expect(result).toEqual({
        name: 'Test User',
        id: 'user-id',
        role: 'admin',
      });
    });
  });

  describe('session callback', () => {
    it('should add token role and id to session user when token is provided', async () => {
      const sessionObj = { user: { name: 'Test User' } };
      const token = { id: 'user-id', role: 'admin' };

      const result = await session({ session: sessionObj, token });

      expect(result).toEqual({
        user: {
          name: 'Test User',
          id: 'user-id',
          role: 'admin',
        },
      });
    });

    it('should return session unchanged when token is not provided', async () => {
      const sessionObj = { user: { name: 'Test User' } };

      // The NextAuth session callback usually guarantees token is present if using JWT,
      // but testing the fallback behavior just in case.
      const result = await session({ session: sessionObj, token: null });

      expect(result).toEqual({
        user: {
          name: 'Test User',
        },
      });
    });
  });
});
