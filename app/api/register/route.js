import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const rateLimitMap = new Map();

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const limit = 5;

    if (rateLimitMap.size >= 10000) {
      for (const [key, val] of rateLimitMap.entries()) {
        if (now - val.startTime > windowMs) {
          rateLimitMap.delete(key);
        }
      }
      if (rateLimitMap.size >= 10000) {
        rateLimitMap.clear();
      }
    }

    const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - rateLimitInfo.startTime > windowMs) {
      rateLimitInfo.count = 1;
      rateLimitInfo.startTime = now;
    } else {
      rateLimitInfo.count++;
    }

    rateLimitMap.set(ip, rateLimitInfo);

    if (rateLimitInfo.count > limit) {
      return NextResponse.json({ error: 'Too many registration attempts from this IP, please try again after 15 minutes' }, { status: 429 });
    }

    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (
      typeof email !== 'string' || email.length > 100 ||
      typeof password !== 'string' || password.length > 100 ||
      (name && (typeof name !== 'string' || name.length > 50))
    ) {
      return NextResponse.json({ error: 'Invalid input length or type' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long, and include uppercase, lowercase, a digit, and a special character' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'Account created successfully', userId: user.id }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
