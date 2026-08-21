export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Buy CS2 Prime Accounts | Global Elite & Faceit Level 10 | SmurfRank',
  description: 'Premium CS2 smurf accounts with high trust factor. Instant delivery on Global Elite, Premier ratings, and Prime enabled accounts.',
  keywords: 'buy cs2 prime accounts, cs2 smurf, buy csgo accounts, global elite accounts, faceit level 10, cheap cs2 accounts',
  openGraph: {
    title: 'Buy Premium CS2 Prime & Smurf Accounts',
    description: 'Get instant access to top-tier CS2 accounts. Global Elite, high Faceit levels, and Prime ready.',
    url: 'https://smurfrank.vercel.app/cs2',
  }
};

import { prisma } from '../../../lib/prisma';
import CS2PageClient from './page.client';

export default async function CS2Page() {
  const listings = await prisma.listing.findMany({
    where: { game: 'CS2', active: true },
    orderBy: { createdAt: 'desc' },
  });

  return <CS2PageClient listings={listings} />;
}
