import { POST } from '../../../app/api/register/route';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

// Mock dependencies
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('POST /api/register', () => {
  let mockRequest;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Default valid mock request
    mockRequest = {
      headers: {
        get: (key) => key === 'x-forwarded-for' ? '127.0.0.1-' + Math.random() : null
      },
      json: jest.fn().mockResolvedValue({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
      }),
    };
  });

  it('should return 400 if email is missing', async () => {
    mockRequest.json.mockResolvedValueOnce({
      name: 'Test User',
      password: 'Password123!',
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email and password are required');
  });

  it('should return 400 if password is missing', async () => {
    mockRequest.json.mockResolvedValueOnce({
      name: 'Test User',
      email: 'test@example.com',
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email and password are required');
  });

  it('should return 400 if invalid email format', async () => {
    mockRequest.json.mockResolvedValueOnce({
      name: 'Test User',
      email: 'invalid-email',
      password: 'Password123!',
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid email format');
  });

  it('should return 400 if password does not meet complexity requirements', async () => {
    mockRequest.json.mockResolvedValueOnce({
      name: 'Test User',
      email: 'test@example.com',
      password: '123',
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/Password must be at least 8 characters long/);
  });

  it('should return 400 if email is already registered', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ id: '1', email: 'test@example.com' });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(response.status).toBe(400);
    expect(data.error).toBe('Email already registered');
  });

  it('should return 201 and create user successfully', async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null);
    bcrypt.hash.mockResolvedValueOnce('hashed_password');
    prisma.user.create.mockResolvedValueOnce({ id: 'new_user_id', name: 'Test User', email: 'test@example.com' });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.hash).toHaveBeenCalledWith('Password123!', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { name: 'Test User', email: 'test@example.com', password: 'hashed_password' },
    });
    expect(response.status).toBe(201);
    expect(data.message).toBe('Account created successfully');
    expect(data.userId).toBe('new_user_id');
  });

  it('should return 500 if an error occurs during processing', async () => {
    prisma.user.findUnique.mockRejectedValueOnce(new Error('Database error'));

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Something went wrong');
  });

  it('should return 500 if an error occurs during user creation', async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null);
    bcrypt.hash.mockResolvedValueOnce('hashed_password');
    prisma.user.create.mockRejectedValueOnce(new Error('Database error during creation'));

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Something went wrong');
  });

  it('should return 500 if an error occurs while parsing request JSON', async () => {
    mockRequest.json.mockRejectedValueOnce(new Error('Invalid JSON'));

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Something went wrong');
  });
});
