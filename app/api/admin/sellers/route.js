import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdminSession } from '../../../../lib/requireAdmin';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const listings = await prisma.listing.findMany({
    where: { sellerEmail: { not: null } },
    select: { sellerEmail: true, status: true, active: true, price: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  const bySeller = new Map();
  for (const listing of listings) {
    const email = listing.sellerEmail;
    if (!bySeller.has(email)) {
      bySeller.set(email, {
        sellerEmail: email,
        total: 0,
        active: 0,
        pending: 0,
        rejected: 0,
        firstSubmission: listing.createdAt,
      });
    }
    const entry = bySeller.get(email);
    entry.total += 1;
    if (listing.status === 'pending') entry.pending += 1;
    else if (listing.status === 'rejected') entry.rejected += 1;
    else if (listing.active) entry.active += 1;
  }

  const sellers = [...bySeller.values()].sort((a, b) => b.total - a.total);

  return NextResponse.json({ sellers });
}
