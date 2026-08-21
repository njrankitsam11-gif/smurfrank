import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdminSession } from '../../../../lib/requireAdmin';

export async function GET(request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sellerEmail = new URL(request.url).searchParams.get('seller');
  const where = sellerEmail ? { sellerEmail } : {};

  const listings = await prisma.listing.findMany({ where, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ listings });
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, game, rank, region, price, level, wins, hours, type, instant, description, includes, active } = body;

  if (!title || !game || !rank || !region || price === undefined || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      game,
      rank,
      region,
      price: Number(price),
      level: level ?? '',
      wins: wins ?? '',
      hours: hours ?? '',
      type: type ?? '',
      instant: instant ?? true,
      description,
      includes: Array.isArray(includes) ? includes : [],
      active: active ?? true,
    },
  });

  return NextResponse.json({ listing }, { status: 201 });
}
