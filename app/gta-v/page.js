import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy GTA V Modded Accounts | Billions & Max Rank',
  description: 'Buy safe, anti-ban GTA 5 modded accounts with billions in cash and all unlocks. Instant delivery, full original email access.',
};

export default async function GTAVPage() {
  const listings = await prisma.listing.findMany({
    where: { 
      game: { in: ['GTA V', 'GTA V Online'], mode: 'insensitive' }, 
      active: true 
    },
    orderBy: { price: 'asc' },
  });

  // A++ SEO: FAQ Schema Data
  const faqs = [
    { q: 'Are these GTA 5 accounts safe from bans?', a: 'Yes, our accounts are modded using safe, private methods. We provide an anti-ban warranty on all modded accounts to ensure your purchase is secure.' },
    { q: 'Can I change the account details?', a: 'Absolutely. You will receive full access to the original email, allowing you to change the password, linked email, and secure the account completely.' },
    { q: 'Do these accounts have everything unlocked?', a: 'Our premium modded accounts come with billions in cash, max character stats, and all properties, vehicles, and bunker research unlocked.' },
    { q: 'How fast is the delivery?', a: 'Delivery is 100% instant. As soon as your payment is confirmed, the account credentials will be automatically sent to your email and dashboard.' },
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

      {/* 2. Custom CSS for NFT Cards */}
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
            Premium <span style={{ color: '#FF6A00', textShadow: '0 0 30px rgba(255,106,0,0.3)' }}>GTA V</span> Modded
          </h1>
          <p style={{ color: '#888', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Billions of cash, max stats, and pure chaos. Browse our exclusive collection of safe, anti-ban GTA V Online accounts.
          </p>
        </div>

        {/* 3. The NFT Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          {listings.map((listing) => (
            <div key={listing.id} className="nft-card">
              <div className="nft-badge">⚡ Instant</div>
              <div style={{ fontSize: '48px', marginBottom: '20px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }}>🚗</div>
              
              <div style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                {listing.title}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '30px' }}>
                <div style={{ fontSize: '14px', color: '#FF6A00', fontWeight: 700 }}>Account Level: <span style={{ color: 'white' }}>{listing.rank}</span></div>
                <div style={{ fontSize: '14px', color: '#666', fontWeight: 700 }}>Region: <span style={{ color: '#aaa' }}>{listing.region}</span></div>
              </div>
              
              {/* Bottom Row */}
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