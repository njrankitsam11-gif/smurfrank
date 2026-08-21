import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { requireAdminSession } from '../../../../../lib/requireAdmin';

export async function PATCH(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const data = {};

  const fields = ['title', 'game', 'description'];
  for (const field of fields) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (body.price !== undefined) data.price = Number(body.price);
  if (body.active !== undefined) data.active = Boolean(body.active);

  try {
    const service = await prisma.boostingService.update({ where: { id }, data });
    return NextResponse.json({ service });
  } catch {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }
}

export async function DELETE(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.boostingService.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }
}
