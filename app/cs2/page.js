import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy CS2 Smurf Accounts | Prime & High Rank',
  description: 'Premium CS2 smurf accounts with Prime status and high trust factor. Instant delivery across UAE, NA, EU, SEA, and SA.',
};

export default async function CS2Page() {
  const listings = await prisma.listing.findMany({
  where: { 
    game: { equals: 'CS2', mode: 'insensitive' }, 
    active: true 
  },
  orderBy: { price: 'asc' },
});

  const faqs = [
    { q: 'Is it safe to buy CS2 smurf accounts?', a: 'Yes. All accounts are verified with original email access and a clean VAC record.' },
    { q: 'How fast is delivery?', a: 'Delivery is instant. Credentials are sent to your email immediately after payment.' },
  ];

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif'}}>
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a'}}>
        <a href="/" style={{fontSize: '24px', fontWeight: 900, textDecoration: 'none', color: 'white'}}>SMURF<span style={{color: '#FF6A00'}}>RANK</span></a>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px'}}>
          <a href="/cs2" style={{color: '#FF6A00', textDecoration: 'none', fontWeight: 700}}>CS2</a>
          <a href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#999', textDecoration: 'none'}}>GTA V</a>
        </div>
      </nav>

      <section style={{padding: '80px 40px', maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{fontSize: '64px', fontWeight: 900, textTransform: 'uppercase'}}>BUY CS2 <span style={{color: '#FF6A00'}}>SMURF ACCOUNTS</span></h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '40px'}}>
          {listings.length > 0 ? listings.map((listing) => (
            <div key={listing.id} style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px'}}>
              <div style={{fontSize: '16px', fontWeight: 700}}>{listing.title}</div>
              <div style={{color: '#FF6A00', margin: '10px 0'}}>${Number(listing.price).toFixed(2)}</div>
              <a href={`/listings/${listing.id}`} style={{background: '#FF6A00', color: '#000', padding: '10px', display: 'block', textAlign: 'center', textDecoration: 'none', fontWeight: 700}}>BUY NOW</a>
            </div>
          )) : <p style={{color: '#666'}}>No CS2 accounts in stock. Check back soon!</p>}
        </div>
      </section>

      <section style={{padding: '40px', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #1a1a1a'}}>
        <h2 style={{color: '#FF6A00'}}>FAQ</h2>
        {faqs.map(f => (
          <div key={f.q} style={{marginBottom: '20px'}}>
            <div style={{fontWeight: 700}}>{f.q}</div>
            <div style={{color: '#666'}}>{f.a}</div>
          </div>
        ))}
      </section>
    </main>
  );
}