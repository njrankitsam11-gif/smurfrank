import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';
import { requireAdminSession } from '../../../../../../lib/requireAdmin';

export async function POST(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { body: messageBody } = body;

  if (typeof messageBody !== 'string' || !messageBody.trim() || messageBody.length > 2000) {
    return NextResponse.json({ error: 'Message is required (max 2000 characters)' }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const message = await prisma.inquiryMessage.create({
    data: { inquiryId: id, sender: 'admin', body: messageBody.trim() },
  });
  await prisma.inquiry.update({ where: { id }, data: { updatedAt: new Date() } });

  return NextResponse.json({ id: message.id, sender: message.sender, body: message.body, createdAt: message.createdAt }, { status: 201 });
}
