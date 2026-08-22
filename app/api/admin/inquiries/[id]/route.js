import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { requireAdminSession } from '../../../../../lib/requireAdmin';

export async function GET(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  });

  if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: inquiry.id,
    topic: inquiry.topic,
    name: inquiry.name,
    email: inquiry.email,
    status: inquiry.status,
    createdAt: inquiry.createdAt,
    messages: inquiry.messages.map((m) => ({ id: m.id, sender: m.sender, body: m.body, createdAt: m.createdAt })),
  });
}

export async function PATCH(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  if (!['open', 'closed'].includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const inquiry = await prisma.inquiry.update({ where: { id }, data: { status: body.status } });
    return NextResponse.json({ status: inquiry.status });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
