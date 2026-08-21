import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdminSession } from '../../../../lib/requireAdmin';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return NextResponse.json({ users });
}
