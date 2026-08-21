import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { requireAdminSession } from '../../../../../lib/requireAdmin';

export async function PATCH(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const data = {};

  const fields = ['title', 'game', 'rank', 'region', 'level', 'wins', 'hours', 'type', 'description'];
  for (const field of fields) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (body.price !== undefined) data.price = Number(body.price);
  if (body.instant !== undefined) data.instant = Boolean(body.instant);
  if (body.active !== undefined) data.active = Boolean(body.active);
  if (body.includes !== undefined) data.includes = Array.isArray(body.includes) ? body.includes : [];
  if (body.images !== undefined) data.images = Array.isArray(body.images) ? body.images : [];
  if (body.status !== undefined && ['pending', 'active', 'rejected'].includes(body.status)) {
    data.status = body.status;
  }

  try {
    const listing = await prisma.listing.update({ where: { id }, data });
    return NextResponse.json({ listing });
  } catch {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
}

export async function DELETE(request, { params }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.listing.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
}
