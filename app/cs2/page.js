import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy CS2 Smurf Accounts — Cheap & Instant Delivery',
  description: 'Buy CS2 Prime and Non-Prime smurf accounts. Instant delivery across UAE, NA, EU, SEA, SA. Verified sellers, escrow protected. From $14.99.',
  keywords: ['buy cs2 smurf account', 'cs2 prime account', 'buy cs2 account UAE', 'cheap cs2 accounts'],
};

export default async function CS2Page() {
  const listings = await prisma.listing.findMany({
    where: { game: 'Counter-Strike 2', active: true },
    orderBy: { price: 'asc' },
  });

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, backgroundColor: '#050507', zIndex: 100}}>
        <a href="/" style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </a>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px'}}>
          <a href="/cs2" style={{color: '#FF6A00', textDecoration: 'none', fontWeight: 700}}>CS2</a>
          <a href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#999', textDecoration: 'none'}}>GTA V</a>
        </div>
        <a href="/login" style={{background: '#FF6A00', color: '#000', padding: '8px 20px', fontWeight: 700, textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'}}>Sign In</a>
      </nav>

      <section style={{padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{fontSize: '12px', color: '#FF6A00', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px'}}>🎯 Counter-Strike 2</div>
        <h1 style={{fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 16px', lineHeight: 1}}>
          Buy CS2 <span style={{color: '#FF6A00'}}>Smurf Accounts</span>
        </h1>
        <p style={{color: '#666', fontSize: '16px', maxWidth: '600px', marginBottom: '40px'}}>
          Prime & Non-Prime CS2 accounts. Instant delivery, all regions — UAE, NA, EU, SEA, SA. Verified sellers only.
        </p>
      </section>

      <section style={{padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
          {listings.map((listing) => (
            <div key={listing.id} style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px', position: 'relative'}}>
              <div style={{position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,106,0,0.1)', color: '#FF6A00', fontSize: '11px', padding: '3px 8px', border: '1px solid rgba(255,106,0,0.3)'}}>⚡ Instant</div>
              <div style={{fontSize: '32px', marginBottom: '12px'}}>🎯</div>
              <div style={{fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px'}}>{listing.title}</div>
              <div style={{fontSize: '13px', color: '#FF6A00', marginBottom: '4px'}}>{listing.rank}</div>
              <div style={{fontSize: '12px', color: '#666', marginBottom: '20px'}}>{listing.region}</div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{fontSize: '24px', fontWeight: 900, color: '#FF6A00'}}>${Number(listing.price).toFixed(2)}</div>
                <a href={`/listings/${listing.id}`} style={{background: '#FF6A00', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', textDecoration: 'none'}}>
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* FAQ SECTION */}
      <section style={{padding: '60px 40px', maxWidth: '900px', margin: '0 auto', borderTop: '1px solid #1a1a1a'}}>
        <h2 style={{fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px'}}>
          Frequently Asked <span style={{color: '#FF6A00'}}>Questions</span>
        </h2>
        {[
          {q: 'Is it safe to buy CS2 smurf accounts?', a: 'Yes. All CS2 accounts on SmurfRank are verified by our team. Every account comes with original email access and a clean VAC record. We use escrow protection so your money is safe until you receive the account.'},
          {q: 'How fast is delivery for CS2 accounts?', a: 'All CS2 accounts on SmurfRank are delivered instantly after payment. You will receive the account credentials within minutes of your purchase being confirmed.'},
          {q: 'What regions are CS2 smurf accounts available for?', a: 'We offer CS2 smurf accounts for UAE, NA (North America), EU (Europe), SEA (Southeast Asia), and SA (South America) regions.'},
          {q: 'What is the difference between Prime and Non-Prime CS2 accounts?', a: 'Prime accounts have the Prime Status unlocked which gives access to Prime matchmaking with other verified players. Non-Prime accounts are standard accounts without Prime Status.'},
          {q: 'Can I get banned for using a smurf account in CS2?', a: 'SmurfRank accounts are clean with no VAC bans or game bans. However, always follow the game\'s terms of service when using any account.'},
        ].map((faq) => (
          <div key={faq.q} style={{borderBottom: '1px solid #1a1a1a', paddingBottom: '24px', marginBottom: '24px'}}>
            <div style={{fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '12px'}}>{faq.q}</div>
            <div style={{fontSize: '14px', color: '#666', lineHeight: '1.8'}}>{faq.a}</div>
          </div>
        ))}
      </section>

      <footer style={{padding: '40px', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: '40px'}}>
        <div style={{fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '16px'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </div>
        <div style={{color: '#333', fontSize: '13px'}}>© 2025 SmurfRank. All rights reserved.</div>
      </footer>

    </main>
  )
}