import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import { sendOrderConfirmationEmail } from '../../../lib/email/orderConfirmation';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const body = await request.json().catch(() => ({}));
  const items = Array.isArray(body.items) ? body.items : [];

  if (items.length === 0) {
    return NextResponse.json({ error: 'No items to order.' }, { status: 400 });
  }

  const cleanItems = [];
  for (const item of items) {
    const priceNum = parseFloat(String(item?.price).replace('$', ''));
    if (!item?.title || !Number.isFinite(priceNum) || priceNum <= 0) {
      return NextResponse.json({ error: 'Each item needs a valid title and price.' }, { status: 400 });
    }
    cleanItems.push({
      itemTitle: String(item.title).slice(0, 200),
      itemPrice: priceNum,
      quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1)),
      listingId: typeof item.listingId === 'string' && item.listingId.length < 100 ? item.listingId : null,
      buyerEmail: session?.user?.email ?? null,
      status: 'paid',
    });
  }

  const orders = await prisma.$transaction(
    cleanItems.map((data) => prisma.order.create({ data }))
  );

  if (session?.user?.email) {
    await sendOrderConfirmationEmail({ to: session.user.email, orders });
  }

  return NextResponse.json({ orders }, { status: 201 });
}
