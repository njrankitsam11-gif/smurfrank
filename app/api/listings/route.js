import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'You must be signed in to submit a listing.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { title, game, price, description, includes } = body;

  if (!title || !game || price === undefined || !description) {
    return NextResponse.json({ error: 'Title, game, price, and description are required.' }, { status: 400 });
  }

  const priceNum = Number(price);
  if (!Number.isFinite(priceNum) || priceNum <= 0) {
    return NextResponse.json({ error: 'Price must be a positive number.' }, { status: 400 });
  }

  const listing = await prisma.listing.create({
    data: {
      title: String(title).slice(0, 200),
      game: String(game).slice(0, 50),
      rank: body.rank ? String(body.rank).slice(0, 50) : '',
      region: body.region ? String(body.region).slice(0, 50) : '',
      price: priceNum,
      level: body.level ? String(body.level).slice(0, 50) : '',
      wins: body.wins ? String(body.wins).slice(0, 50) : '',
      hours: body.hours ? String(body.hours).slice(0, 50) : '',
      type: body.type ? String(body.type).slice(0, 50) : '',
      instant: true,
      description: String(description).slice(0, 2000),
      includes: Array.isArray(includes) ? includes.map(String).slice(0, 20) : [],
      active: false,
      status: 'pending',
      sellerEmail: session.user.email,
    },
  });

  return NextResponse.json({ listing }, { status: 201 });
}
