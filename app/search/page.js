import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Search Ranked Accounts',
  description: 'Search for specific ranks, regions, and games across the SmurfRank marketplace.',
};

export default async function SearchPage({ searchParams }) {
  // Get the search word from the URL (e.g., /search?q=valorant)
  const rawQ = (await searchParams).q;
  const qString = Array.isArray(rawQ) ? rawQ[0] : String(rawQ || '');
  // 🛡️ SENTINEL: Truncate query to prevent ReDoS / memory exhaustion
  const query = qString.substring(0, 100);
  const page = Math.max(1, parseInt((await searchParams).page) || 1);
  const limit = 12;
  const skip = (page - 1) * limit;

  const where = {
    active: true,
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { game: { contains: query, mode: 'insensitive' } },
      { rank: { contains: query, mode: 'insensitive' } },
      { region: { contains: query, mode: 'insensitive' } },
    ],
  };

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

  // Get the total number of items to calculate totalPages
  const totalItems = await prisma.listing.count({
    where: whereClause,
  });
  const totalPages = Math.ceil(totalItems / limit);

  // Find listings that match the search word in the title, game, or rank
  const results = await prisma.listing.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      
      {/* Navigation */}
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a', backgroundColor: '#050507'}}>
        <Link href="/" style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </Link>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px'}}>
          <Link href="/cs2" style={{color: '#999', textDecoration: 'none'}}>CS2</Link>
          <Link href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</Link>
          <Link href="/gta-v" style={{color: '#999', textDecoration: 'none'}}>GTA V</Link>
        </div>
        <Link href="/login" style={{background: '#FF6A00', color: '#000', padding: '8px 20px', fontWeight: 700, textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase'}}>Sign In</Link>
      </nav>

      {/* Search Header */}
      <section style={{padding: '60px 40px', maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px'}}>
          Search Results
        </h1>
        <p style={{color: '#666', marginBottom: '40px'}}>
          {query ? `Showing results for "${query}"` : 'Showing all available accounts'}
        </p>

        {/* The Search Bar (allowing users to search again) */}
        <form action="/search" method="GET" style={{marginBottom: '60px', display: 'flex', gap: '10px'}}>
          <input 
            name="q" 
            defaultValue={query}
            placeholder="Search by rank, game, or region..." 
            style={{flex: 1, padding: '16px', backgroundColor: '#0f0f17', border: '1px solid #1a1a1a', color: 'white', fontSize: '16px'}}
          />
          <button type="submit" style={{backgroundColor: '#FF6A00', color: 'black', border: 'none', padding: '0 30px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase'}}>
            Search
          </button>
        </form>

        {/* Results Grid */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
          {results.length > 0 ? (
            results.map((listing) => (
              <div key={listing.id} style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px', position: 'relative'}}>
                <div style={{fontSize: '11px', color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>{listing.game}</div>
                <div style={{fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px'}}>{listing.title}</div>
                <div style={{fontSize: '13px', color: '#888', marginBottom: '20px'}}>{listing.rank} • {listing.region}</div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{fontSize: '24px', fontWeight: 900, color: '#FF6A00'}}>${Number(listing.price).toFixed(2)}</div>
                  <Link href={`/listings/${listing.id}`} style={{background: '#FF6A00', color: '#000', padding: '10px 20px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase'}}>
                    View
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '80px 0'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>🔍</div>
              <h3 style={{fontSize: '20px', color: 'white'}}>No accounts found matching &quot;{query}&quot;</h3>
              <p style={{color: '#666'}}>Try searching for a specific game, region, or rank tier.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
            {page > 1 && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                style={{ padding: '10px 20px', border: '1px solid #1a1a1a', color: 'white', textDecoration: 'none', background: '#0f0f17' }}
              >
                Previous
              </Link>
            )}
            <span style={{ padding: '10px 20px', color: '#666' }}>
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                style={{ padding: '10px 20px', border: '1px solid #1a1a1a', color: 'white', textDecoration: 'none', background: '#0f0f17' }}
              >
                Next
              </Link>
            )}
          </div>
        )}

      </section>

      {/* Footer */}
      <footer style={{padding: '40px', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: '80px'}}>
        <div style={{color: '#333', fontSize: '12px'}}>© 2026 SMURFRANK MARKETPLACE.</div>
      </footer>
    </main>
  );
}