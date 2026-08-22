import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = await params;
  const token = request.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  });

  if (!inquiry || inquiry.contactToken !== token) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: inquiry.id,
    topic: inquiry.topic,
    status: inquiry.status,
    messages: inquiry.messages.map((m) => ({ id: m.id, sender: m.sender, body: m.body, createdAt: m.createdAt })),
  });
}

export async function POST(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { token, body: messageBody } = body;

  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  if (typeof messageBody !== 'string' || !messageBody.trim() || messageBody.length > 2000) {
    return NextResponse.json({ error: 'Message is required (max 2000 characters)' }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry || inquiry.contactToken !== token) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const message = await prisma.inquiryMessage.create({
    data: { inquiryId: id, sender: 'user', body: messageBody.trim() },
  });
  await prisma.inquiry.update({
    where: { id },
    data: { updatedAt: new Date(), status: inquiry.status === 'closed' ? 'open' : inquiry.status },
  });

  return NextResponse.json({ id: message.id, sender: message.sender, body: message.body, createdAt: message.createdAt }, { status: 201 });
}
