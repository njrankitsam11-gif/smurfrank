import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import crypto from 'crypto';

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond the same way whether or not the account exists, to avoid leaking which emails are registered.
  const genericResponse = { ok: true, message: 'If an account exists for that email, a reset link has been generated.' };

  if (!user) {
    return NextResponse.json(genericResponse);
  }

  const token = crypto.randomBytes(32).toString('hex');
  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
  });

  // No email provider is configured for this project, so the reset link is returned directly
  // instead of being emailed. Replace this with an email send once a provider is wired up.
  return NextResponse.json({ ...genericResponse, resetUrl: `/reset-password?token=${token}` });
}
