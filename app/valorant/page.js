import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy Valorant Smurf Accounts — Iron to Radiant',
  description: 'Buy Valorant smurf accounts from Iron to Radiant. Instant delivery across UAE, NA, EU, SEA, SA. Verified sellers, escrow protected.',
};

export default async function ValorantPage() {
  const listings = await prisma.listing.findMany({
    where: { 
      game: { equals: 'Valorant', mode: 'insensitive' }, 
      active: true 
    },
    orderBy: { price: 'asc' },
  });

  // A++ SEO: FAQ Schema Data
  const faqs = [
    { q: 'Are these Valorant accounts ranked ready?', a: 'Yes, all our smurf accounts are Level 20 or higher and ready for competitive ranked play immediately.' },
    { q: 'Can I change the email on the account?', a: 'Absolutely. Every account comes with original email access, allowing you to change the password and recovery email instantly.' },
    { q: 'What regions do you support for Valorant?', a: 'We provide accounts for UAE/AP, North America (NA), and Europe (EU) regions.' },
    { q: 'Is there a warranty on the accounts?', a: 'Yes, we provide a lifetime warranty against any account recoveries, ensuring your purchase is safe.' },
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
    <main style={{ minHeight: '100vh', padding: '60px 20px' }}>
      
      {/* 1. Invisible SEO Layer for Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 2. 🪄 Custom CSS for the Interactive NFT Cards */}
      <style dangerouslySetInnerHTML={{__html: `
        .nft-card {
          background: linear-gradient(145deg, #0f0f17 0%, #050507 100%);
          border: 1px solid #1a1a1a;
          border-radius: 16px;
          padding: 30px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          cursor: pointer;
        }
        .nft-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: #FF6A00;
          box-shadow: 0 15px 35px rgba(255, 106, 0, 0.15), inset 0 0 20px rgba(255, 106, 0, 0.05);
        }
        .nft-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 106, 0, 0.1);
          color: #FF6A00;
          font-size: 11px;
          padding: 6px 12px;
          border: 1px solid rgba(255, 106, 0, 0.3);
          border-radius: 30px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .buy-btn {
          background: #1a1a1a;
          color: white;
          border: 1px solid #333;
          transition: all 0.3s ease;
        }
        .nft-card:hover .buy-btn {
          background: linear-gradient(45deg, #FF6A00, #e65c00);
          color: #000;
          border-color: #FF6A00;
          box-shadow: 0 0 20px rgba(255, 106, 0, 0.4);
        }
      `}} />

      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Premium Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 20px', letterSpacing: '-1px' }}>
            Premium <span style={{ color: '#FF6A00', textShadow: '0 0 30px rgba(255,106,0,0.3)' }}>Valorant</span> Smurfs
          </h1>
          <p style={{ color: '#888', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Iron to Radiant. Instant delivery. Browse our exclusive collection of competitive-ready Valorant accounts.
          </p>
        </div>

        {/* 3. The NFT Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          {listings.map((listing) => (
            <div key={listing.id} className="nft-card">
              <div className="nft-badge">⚡ Instant</div>
              <div style={{ fontSize: '48px', marginBottom: '20px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }}>🎮</div>
              
              <div style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                {listing.title}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '30px' }}>
                <div style={{ fontSize: '14px', color: '#FF6A00', fontWeight: 700 }}>Rank Tier: <span style={{ color: 'white' }}>{listing.rank}</span></div>
                <div style={{ fontSize: '14px', color: '#666', fontWeight: 700 }}>Region: <span style={{ color: '#aaa' }}>{listing.region}</span></div>
              </div>
              
              {/* Bottom Row: Price & Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: '24px' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'white' }}>
                  ${Number(listing.price).toFixed(2)}
                </div>
                <a href={`/listings/${listing.id}`} className="buy-btn" style={{ padding: '12px 28px', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '8px', letterSpacing: '1px' }}>
                  Inspect
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Visible FAQ Section */}
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center' }}>
            Frequently Asked <span style={{ color: '#FF6A00' }}>Questions</span>
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '24px', marginBottom: '24px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>{faq.q}</div>
                <div style={{ fontSize: '14px', color: '#888', lineHeight: '1.8' }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}