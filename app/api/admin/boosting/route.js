import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdminSession } from '../../../../lib/requireAdmin';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const services = await prisma.boostingService.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ services });
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, game, price, description } = body;

  if (!title || !game || price === undefined || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const service = await prisma.boostingService.create({
    data: {
      title,
      game,
      price: Number(price),
      description,
      active: body.active ?? true,
    },
  });

  return NextResponse.json({ service }, { status: 201 });
}
