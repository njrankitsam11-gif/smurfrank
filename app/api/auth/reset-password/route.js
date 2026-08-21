import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { token, password } = body;

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ error: 'Missing reset token' }, { status: 400 });
  }
  if (typeof password !== 'string' || !passwordRegex.test(password)) {
    return NextResponse.json({ error: 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { resetToken: token } });

  if (!user || !user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
    return NextResponse.json({ error: 'This reset link is invalid or has expired.' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed, resetToken: null, resetTokenExpiresAt: null },
  });

  return NextResponse.json({ ok: true });
}
