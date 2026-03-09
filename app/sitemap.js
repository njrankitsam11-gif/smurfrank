import { prisma } from '../lib/prisma';

export default async function sitemap() {
  const BASE_URL = 'https://smurfrank.vercel.app';

  // Fetch all active listings from your database
  const listings = await prisma.listing.findMany({
    where: { active: true },
    select: { id: true, updatedAt: true },
  });

  // 1. Static Pages
  const routes = ['', '/cs2', '/valorant', '/gta-v', '/sell', '/search'].map((route) => ({
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