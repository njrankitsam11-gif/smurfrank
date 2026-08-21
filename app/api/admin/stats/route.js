import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdminSession } from '../../../../lib/requireAdmin';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [listingCount, activeListingCount, userCount, adminCount] = await Promise.all([
    prisma.listing.count(),
    prisma.listing.count({ where: { active: true } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: 'admin' } }),
  ]);

  return NextResponse.json({ listingCount, activeListingCount, userCount, adminCount });
}
