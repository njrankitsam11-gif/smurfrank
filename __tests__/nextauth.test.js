const nextAuthMock = jest.fn();
jest.mock('next-auth', () => nextAuthMock);
jest.mock('next-auth/providers/credentials', () => {
    return jest.fn((options) => options);
});
jest.mock('../lib/prisma', () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
        }
    }
}));
jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
}));

const { prisma } = require('../lib/prisma');
const bcrypt = require('bcryptjs');

let authorize;
describe('NextAuth Configuration', () => {
    beforeAll(() => {
        require('../app/api/auth/[...nextauth]/route');
        const options = nextAuthMock.mock.calls[0][0];
        authorize = options.providers[0].authorize;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('enforces rate limiting after 5 failed attempts (case-insensitive)', async () => {
        prisma.user.findUnique.mockResolvedValue(null);

        const credentials1 = { email: ' Test@example.com ', password: 'password123' };
        const credentials2 = { email: 'test@example.com', password: 'password123' };

        for (let i = 0; i < 3; i++) {
            const result = await authorize(credentials1);
            expect(result).toBeNull();
        }
        for (let i = 0; i < 2; i++) {
            const result = await authorize(credentials2);
            expect(result).toBeNull();
        }

        await expect(authorize(credentials1)).rejects.toThrow('Too many failed login attempts. Please try again later.');
    });

    it('resets rate limit on successful login', async () => {
        const credentials = { email: 'success@example.com', password: 'password123' };

        prisma.user.findUnique.mockResolvedValue(null);
        for (let i = 0; i < 4; i++) {
            await authorize(credentials);
        }

        prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'success@example.com', password: 'hashedpassword', name: 'Test', role: 'buyer' });
        bcrypt.compare.mockResolvedValue(true);

        const result = await authorize(credentials);
        expect(result).toEqual({ id: 1, email: 'success@example.com', name: 'Test', role: 'buyer' });

        prisma.user.findUnique.mockResolvedValue(null);
        const result2 = await authorize(credentials);
        expect(result2).toBeNull();
    });
});
