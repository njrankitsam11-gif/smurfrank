import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Search Ranked Accounts',
  description: 'Search for specific ranks, regions, and games across the SmurfRank marketplace.',
};

const getSearchResults = cache(
  unstable_cache(
    async (query) => {
      return prisma.listing.findMany({
        where: {
          active: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { game: { contains: query, mode: 'insensitive' } },
            { rank: { contains: query, mode: 'insensitive' } },
            { region: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    },
    ['search-results'],
    {
      revalidate: 3600,
      tags: ['search'],
    }
  )
);

export default async function SearchPage({ searchParams }) {
  // Get the search word from the URL (e.g., /search?q=valorant)
  const query = (await searchParams).q || '';

  // Find listings that match the search word in the title, game, or rank
  const results = await getSearchResults(query);

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      
      {/* Navigation */}
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a', backgroundColor: '#050507'}}>
        <a href="/" style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </a>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px'}}>
          <a href="/cs2" style={{color: '#999', textDecoration: 'none'}}>CS2</a>
          <a href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#999', textDecoration: 'none'}}>GTA V</a>
        </div>
        <a href="/login" style={{background: '#FF6A00', color: '#000', padding: '8px 20px', fontWeight: 700, textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase'}}>Sign In</a>
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
                  <a href={`/listings/${listing.id}`} style={{background: '#FF6A00', color: '#000', padding: '10px 20px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase'}}>
                    View
                  </a>
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
      </section>

      {/* Footer */}
      <footer style={{padding: '40px', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: '80px'}}>
        <div style={{color: '#333', fontSize: '12px'}}>© 2026 SMURFRANK MARKETPLACE.</div>
      </footer>
    </main>
  );
}