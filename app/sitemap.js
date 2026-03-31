import { prisma } from '../lib/prisma';
import { unstable_cache } from 'next/cache';
import { logger } from '../lib/logger';

export const dynamic = 'force-dynamic';

const getListings = unstable_cache(
  async () => {
    try {
      // ⚡ BOLT OPTIMIZATION: Bounding Unbounded Query
      // 💡 What: Added `take: 10000` to the sitemap query.
      // 🎯 Why: As the marketplace scales, an unbounded `findMany` fetching all active listings simultaneously will eventually trigger OOM (Out Of Memory) crashes and extreme DB load.
      // 📊 Impact: O(1) memory usage in Node.js instead of O(N), ensuring sitemap generation stays within memory limits regardless of marketplace size.
      return await prisma.listing.findMany({
        where: { active: true },
        select: { id: true, updatedAt: true },
        take: 10000,
      });
    } catch (error) {
      logger.warn("Could not reach DB for sitemap generation. Using empty list.", error);
      return [];
    }
  },
  ['sitemap-listings'],
  { revalidate: 3600 }
);

export default async function sitemap() {
  const BASE_URL = 'https://smurfrank.vercel.app';

  // Fetch all active listings from your database
  const listings = await getListings();

  // 1. Static Pages
  const routes = ['', '/cs2', '/valorant', '/gta-v', '/boosting', '/sell', '/search'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  // 2. Dynamic Listing Pages (Google finds every account automatically)
  const listingRoutes = listings.map((item) => ({
    url: `${BASE_URL}/listings/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...routes, ...listingRoutes];
}
