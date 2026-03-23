import { POST } from '../../../app/api/register/route';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.findUnique || jest.fn(),
      create: jest.create || jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('POST /api/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockRequest = (body) => ({
    json: jest.fn().mockResolvedValue(body),
  });

  it('returns 400 if email and password are not provided', async () => {
    const req = mockRequest({});
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Email and password are required');
  });

  it('returns 400 if password is less than 6 characters', async () => {
    const req = mockRequest({ email: 'test@example.com', password: '123' });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Password must be at least 6 characters');
  });

  it('returns 400 if email is already registered', async () => {
    const req = mockRequest({ email: 'existing@example.com', password: 'password123' });

    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'existing@example.com',
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Email already registered');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'existing@example.com' },
    });
  });

  it('returns 201 on successful registration', async () => {
    const req = mockRequest({ name: 'Test User', email: 'new@example.com', password: 'password123' });

    prisma.user.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    prisma.user.create.mockResolvedValue({ id: 2, name: 'Test User', email: 'new@example.com' });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.message).toBe('Account created successfully');
    expect(json.userId).toBe(2);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'new@example.com' },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { name: 'Test User', email: 'new@example.com', password: 'hashedPassword123' },
    });
  });

  it('returns 500 on server error', async () => {
    const req = mockRequest({ name: 'Test User', email: 'error@example.com', password: 'password123' });

    prisma.user.findUnique.mockRejectedValue(new Error('Database error'));

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe('Something went wrong');
  });
});
