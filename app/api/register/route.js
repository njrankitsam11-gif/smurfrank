import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
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