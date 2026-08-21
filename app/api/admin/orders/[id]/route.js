import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { requireAdminSession } from '../../../../../lib/requireAdmin';

const ALLOWED_STATUSES = ['paid', 'delivered', 'completed', 'disputed'];

export async function PATCH(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  if (!body.status || !ALLOWED_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const order = await prisma.order.update({ where: { id }, data: { status: body.status } });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
}
