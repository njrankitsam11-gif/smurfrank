import { prisma } from '../../../lib/prisma';
import ListingGrid from '../../../components/marketplace/ListingGrid';

export const metadata = {
  title: 'Search Ranked Accounts',
  description: 'Search for specific ranks, regions, and games across the SmurfRank marketplace.',
};

export default async function SearchPage({ searchParams }) {
  // Get the search word from the URL (e.g., /search?q=valorant)
  const queryRaw = (await searchParams).q || '';
  const queryStr = Array.isArray(queryRaw) ? queryRaw[0] : String(queryRaw);
  const query = queryStr.substring(0, 100);
  const page = Math.max(1, parseInt((await searchParams).page) || 1);
  const limit = 12;
  const skip = (page - 1) * limit;

  // ⚡ BOLT OPTIMIZATION: Skip OR conditions on empty queries
  // 💡 What: Conditionally build the where clause to avoid the multi-column string scan entirely if query is empty.
  // 🎯 Why: Sending { contains: '', mode: 'insensitive' } forces a full scan on 4 string columns unnecessarily.
  // 📊 Impact: Bypasses string evaluation on the entire active dataset, saving DB CPU and improving query response time for the default search page view.
  const whereClause = { active: true };
  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { game: { contains: query, mode: 'insensitive' } },
      { rank: { contains: query, mode: 'insensitive' } },
      { region: { contains: query, mode: 'insensitive' } },
    ];
  }

  // ⚡ BOLT OPTIMIZATION: Concurrent pagination queries
  // 💡 What: Use Promise.all to fetch total item count and paginated results simultaneously.
  // 🎯 Why: Awaiting count and findMany sequentially doubles the database response time.
  // 📊 Impact: Reduces total query duration by ~50% for the search results page.
  const [totalItems, results] = await Promise.all([
    prisma.listing.count({ where: whereClause }),
    prisma.listing.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    })
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <main className="min-h-screen bg-ink-950 text-ink-50">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Search Results</h1>
        <p className="mt-2 text-sm text-ink-300">
          {query ? `Showing results for "${query}"` : 'Showing all available accounts'}
        </p>

        <form action="/search" method="GET" className="mb-12 mt-8 flex gap-3">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search by rank, game, or region..."
            aria-label="Search by rank, game, or region..."
            className="focus-ring flex-1 rounded-lg border border-ink-500 bg-ink-800 px-4 py-4 text-sm text-ink-50 placeholder:text-ink-300"
          />
          <button
            type="submit"
            className="focus-ring rounded-lg bg-gold-400 px-8 text-xs font-bold uppercase tracking-wide text-ink-950 shadow-gold transition-colors hover:bg-gold-300"
          >
            Search
          </button>
        </form>

        {results.length > 0 ? (
          <ListingGrid listings={results} />
        ) : (
          <div className="py-24 text-center">
            <div className="mb-5 text-4xl" aria-hidden="true">🔍</div>
            <h3 className="text-lg font-bold text-ink-50">No accounts found matching &quot;{query}&quot;</h3>
            <p className="mt-2 text-sm text-ink-300">Try searching for a specific game, region, or rank tier.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-4">
            {page > 1 && (
              <a
                href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                className="focus-ring rounded-lg border border-ink-600 bg-ink-800 px-5 py-2.5 text-sm text-ink-50"
              >
                Previous
              </a>
            )}
            <span className="text-sm text-ink-300">Page {page} of {totalPages}</span>
            {page < totalPages && (
              <a
                href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                className="focus-ring rounded-lg border border-ink-600 bg-ink-800 px-5 py-2.5 text-sm text-ink-50"
              >
                Next
              </a>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
