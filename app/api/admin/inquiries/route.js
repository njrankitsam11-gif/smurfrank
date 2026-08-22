import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdminSession } from '../../../../lib/requireAdmin';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  });

  return NextResponse.json({
    inquiries: inquiries.map((inq) => ({
      id: inq.id,
      topic: inq.topic,
      name: inq.name,
      email: inq.email,
      status: inq.status,
      createdAt: inq.createdAt,
      updatedAt: inq.updatedAt,
      lastMessage: inq.messages[0] ? { sender: inq.messages[0].sender, body: inq.messages[0].body } : null,
    })),
  });
}
