import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy CS2 Smurf Accounts | Prime & High Rank | RankVault',
  description: 'Premium CS2 smurf accounts with Prime status and high trust factor. Instant delivery across UAE, NA, EU, SEA, and SA. Secured by escrow.',
  keywords: ['buy cs2 smurf account', 'cs2 prime account', 'cs2 high rank accounts UAE'],
};

export default async function CS2Page() {
  // 1. Fetch CS2 listings from your database
  const listings = await prisma.listing.findMany({
    where: { game: 'CS2', active: true },
    orderBy: { price: 'asc' },
  });

  // 2. SEO FAQ Content for Google
  const faqs = [
    { q: 'Is it safe to buy CS2 smurf accounts?', a: 'Yes. All CS2 accounts on RankVault are verified by our team. Every account comes with original email access and a clean VAC record.' },
    { q: 'How fast is delivery for CS2 accounts?', a: 'All CS2 accounts on RankVault are delivered instantly after payment. You will receive the account credentials within minutes.' },
    { q: 'What is the difference between Prime and Non-Prime?', a: 'Prime accounts have the Prime Status unlocked, which gives access to better matchmaking with verified players and exclusive drops.' },
    { q: 'Can I get banned for using a smurf account?', a: 'Our accounts are clean with no history of cheats. As long as you follow the game terms of service, your account is safe.' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      {/* SEO Schema Layer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Navigation */}
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

      {/* Hero Section */}
      <section style={{padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{fontSize: '12px', color: '#FF6A00', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px'}}>⚡ Counter-Strike 2</div>
        <h1 style={{fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 16px', lineHeight: 1}}>
          Buy CS2 <span style={{color: '#FF6A00'}}>Smurf Accounts</span>
        </h1>
        <p style={{color: '#666', fontSize: '16px', maxWidth: '600px', marginBottom: '40px'}}>
          Premium Prime-ready CS2 accounts. High trust factor, instant delivery, and verified across UAE, NA, EU, and SEA regions.
        </p>
      </section>

      {/* Database Listings */}
      <section style={{padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
          {listings.map((listing) => (
            <div key={listing.id} style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px', position: 'relative'}}>
              <div style={{position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,106,0,0.1)', color: '#FF6A00', fontSize: '11px', padding: '3px 8px', border: '1px solid rgba(255,106,0,0.3)'}}>⚡ Instant</div>
              <div style={{fontSize: '32px', marginBottom: '12px'}}>🔫</div>
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

      {/* FAQ Section */}
      <section style={{padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #1a1a1a'}}>
        <h2 style={{fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px'}}>
          Frequently Asked <span style={{color: '#FF6A00'}}>Questions</span>
        </h2>
        {faqs.map((faq) => (
          <div key={faq.q} style={{borderBottom: '1px solid #1a1a1a', paddingBottom: '24px', marginBottom: '24px'}}>
            <div style={{fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '12px'}}>{faq.q}</div>
            <div style={{fontSize: '14px', color: '#666', lineHeight: '1.8'}}>{faq.a}</div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{padding: '40px', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: '40px'}}>
        <div style={{fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '16px'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </div>
        <div style={{color: '#333', fontSize: '13px'}}>© 2025 SmurfRank. All rights reserved.</div>
      </footer>
    </main>
  )
}