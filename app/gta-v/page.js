import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'GTA 5 Modded Accounts | Billions in Cash & Max Rank | RankVault',
  description: 'Buy safe GTA 5 modded accounts for PC, PS5, and Xbox. Billions in cash, maxed skills, and all unlocks. Instant delivery and 0% ban risk.',
  keywords: ['buy gta 5 modded account', 'gta online money boost', 'gta 5 max rank account UAE'],
};

export default async function GTAVPage() {
  const listings = await prisma.listing.findMany({
  where: { 
    game: { equals: 'GTA V', mode: 'insensitive' }, 
    active: true 
  },
  orderBy: { price: 'asc' },
});

  const faqs = [
    { q: 'Are these GTA 5 accounts safe from bans?', a: 'Yes. Our modded accounts are created using the safest methods to ensure a 0% ban rate.' },
    { q: 'What comes with a GTA V modded account?', a: 'Accounts include billions in banked cash, character levels (100-500+), and all heist/vehicle unlocks.' },
  ];

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif'}}>
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a'}}>
        <a href="/" style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white'}}>
          SMURF<span style={{color: '#FF6A00'}}>RANK</span>
        </a>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px'}}>
          <a href="/cs2" style={{color: '#999', textDecoration: 'none'}}>CS2</a>
          <a href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#FF6A00', textDecoration: 'none', fontWeight: 700}}>GTA V</a>
        </div>
      </nav>

      <section style={{padding: '80px 40px', maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{fontSize: '64px', fontWeight: 900, textTransform: 'uppercase'}}>BUY GTA V <span style={{color: '#FF6A00'}}>MODDED ACCOUNTS</span></h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '40px'}}>
          {listings.length > 0 ? listings.map((listing) => (
            <div key={listing.id} style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px'}}>
              <div style={{fontSize: '16px', fontWeight: 700, textTransform: 'uppercase'}}>{listing.title}</div>
              <div style={{color: '#FF6A00', fontSize: '24px', fontWeight: 900, margin: '15px 0'}}>${Number(listing.price).toFixed(2)}</div>
              <a href={`/listings/${listing.id}`} style={{background: '#FF6A00', color: '#000', padding: '12px', display: 'block', textAlign: 'center', textDecoration: 'none', fontWeight: 900, textTransform: 'uppercase'}}>BUY NOW</a>
            </div>
          )) : (
            <div style={{gridColumn: '1/-1', padding: '40px', border: '1px dashed #333', textAlign: 'center', color: '#666'}}>
              No GTA V accounts currently in stock. Check back soon!
            </div>
          )}
        </div>
      </section>

      <section style={{padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #1a1a1a'}}>
        <h2 style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '30px'}}>
          Frequently Asked <span style={{color: '#FF6A00'}}>Questions</span>
        </h2>
        {faqs.map(f => (
          <div key={f.q} style={{marginBottom: '30px', borderBottom: '1px solid #111', paddingBottom: '20px'}}>
            <div style={{fontWeight: 700, marginBottom: '10px'}}>{f.q}</div>
            <div style={{color: '#666', fontSize: '14px', lineHeight: '1.6'}}>{f.a}</div>
          </div>
        ))}
      </section>
    </main>
  );
}