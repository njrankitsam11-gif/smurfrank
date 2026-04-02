import { prisma } from '../lib/prisma';

export default async function sitemap() {
  const baseUrl = 'https://smurfrank.vercel.app';

  // Static pages
  const staticPages = [
    '',
    '/cs2',
    '/valorant',
    '/gta-v',
    '/boosting',
    '/sell',
    '/login',
    '/register'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic listings
    const listings = await prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, updatedAt: true },
      take: 10000,
    });

    const listingUrls = listings.map((listing) => ({
      url: `${baseUrl}/listings/${listing.id}`,
      lastModified: listing.updatedAt.toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    return [...staticPages, ...listingUrls];
  } catch (error) {
    console.error('Failed to fetch listings for sitemap:', error);
    return [...staticPages];
  }
}
