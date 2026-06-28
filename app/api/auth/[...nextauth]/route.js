import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (typeof credentials.email !== 'string' || credentials.email.length > 100) return null;
        if (typeof credentials.password !== 'string' || credentials.password.length > 100) return null;

        const originalEmail = credentials.email;
        const rateLimitEmailKey = originalEmail.trim().toLowerCase();
        const now = Date.now();

        const record = rateLimitMap.get(rateLimitEmailKey);
        if (record && record.lockoutUntil > now) {
          throw new Error('Too many failed login attempts. Please try again later.');
        }

        const user = await prisma.user.findFirst({
          where: { email: { equals: originalEmail, mode: 'insensitive' } },
        });

        const recordFailure = () => {
          let currentRecord = rateLimitMap.get(rateLimitEmailKey);

          if (currentRecord && currentRecord.lockoutUntil <= now && currentRecord.lockoutUntil !== 0) {
            currentRecord.attempts = 0;
            currentRecord.lockoutUntil = 0;
          }

          if (!currentRecord) {
            if (rateLimitMap.size >= 10000) {
              const expireTime = Date.now();
              for (const [key, val] of rateLimitMap.entries()) {
                if (val.lockoutUntil < expireTime) {
                  rateLimitMap.delete(key);
                }
              }
              if (rateLimitMap.size >= 10000) {
                rateLimitMap.clear();
              }
            }
            currentRecord = { attempts: 0, lockoutUntil: 0 };
          }
          currentRecord.attempts += 1;
          if (currentRecord.attempts >= MAX_ATTEMPTS) {
            currentRecord.lockoutUntil = Date.now() + LOCKOUT_TIME;
          }
          rateLimitMap.set(rateLimitEmailKey, currentRecord);
        };

        if (!user) {
          recordFailure();
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          recordFailure();
          return null;
        }

        rateLimitMap.delete(rateLimitEmailKey);
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };