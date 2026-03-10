import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy Premium CS2 Smurf Accounts | Prime & Ranked',
  description: 'Buy secure, hand-leveled CS2 Prime smurf accounts. Ready for Premier matchmaking. Instant delivery, original email included.',
};

// High-quality external gaming graphics for the cards
const gamingImages = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&w=600&q=80',
];

export default async function CS2Page() {
  const listings = await prisma.listing.findMany({
    where: { 
      game: { in: ['CS2', 'Counter-Strike 2'], mode: 'insensitive' }, 
      active: true 
    },
    orderBy: { price: 'asc' },
  });

  // A++ SEO: FAQ Schema Data
  const faqs = [
    { q: 'Are these CS2 accounts Prime enabled?', a: 'Yes, we offer both Prime and non-Prime accounts. Check the specific account details, but our premium tier includes full Prime status.' },
    { q: 'Are these accounts safe from VAC bans?', a: 'Absolutely. All our CS2 accounts are hand-leveled by real players. We never use cheats or bots.' },
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
    <main style={{ minHeight: '100vh', padding: '60px 20px', backgroundColor: '#050507' }}>
      
      {/* Invisible SEO Layer */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 🪄 Custom CSS for the 3D FLIP NFT Cards */}
      <style dangerouslySetInnerHTML={{__html: `
        .flip-container {
          perspective: 1000px;
          height: 420px;
          width: 100%;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .flip-container:hover .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-front, .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #1a1a1a;
        }
        
        /* FRONT OF CARD */
        .flip-front {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          background-color: #0f0f17;
        }
        .flip-front::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(5,5,7,0.1) 0%, #050507 100%);
          z-index: 1;
        }
        .front-content {
          position: relative;
          z-index: 2;
        }
        
        /* BACK OF CARD (THE REVEAL) */
        .flip-back {
          background: linear-gradient(145deg, #0f0f17 0%, #050507 100%);
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          border: 1px solid #FF6A00;
          box-shadow: 0 15px 40px rgba(255, 106, 0, 0.2), inset 0 0 30px rgba(255, 106, 0, 0.05);
          text-align: center;
        }
        
        .buy-btn {
          background: linear-gradient(45deg, #FF6A00, #e65c00);
          color: #000;
          padding: 12px 30px;
          font-weight: 900;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 8px;
          margin-top: 20px;
          transition: transform 0.2s;
        }
        .buy-btn:hover {
          transform: scale(1.05);
        }
      `}} />

      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 20px', letterSpacing: '-1px' }}>
            Premium <span style={{ color: '#FF6A00', textShadow: '0 0 30px rgba(255,106,0,0.3)' }}>CS2</span> Smurfs
          </h1>
        </div>

        {/* The 3D NFT Grid (A++ SEO wrapped in <article>) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {listings.map((listing, index) => (
            <article key={listing.id} className="flip-container" aria-label={`CS2 Account: ${listing.title}`}>
              <div className="flip-inner">
                
                {/* --- FRONT OF CARD --- */}
                <div 
                  className="flip-front" 
                  style={{ backgroundImage: `url(${gamingImages[index % gamingImages.length]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,106,0,0.8)', color: '#fff', fontSize: '11px', padding: '6px 12px', borderRadius: '30px', fontWeight: 900, textTransform: 'uppercase', zIndex: 2 }}>
                    ⚡ Hover to Inspect
                  </div>
                  
                  <div className="front-content">
                    <h2 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>{listing.title}</h2>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#FF6A00' }}>${Number(listing.price).toFixed(2)}</div>
                  </div>
                </div>

                {/* --- BACK OF CARD --- */}
                <div className="flip-back">
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔫</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', color: '#FF6A00' }}>
                    Account Dossier
                  </h3>
                  
                  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '24px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {listing.description || `Clean ${listing.game} Prime account. Hand-leveled to ${listing.rank}. Full email access included. No hacks or third-party software used.`}
                  </p>
                  
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '12px 0', marginBottom: '20px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#888' }}>RANK: <span style={{ color: '#fff' }}>{listing.rank}</span></div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#888' }}>REGION: <span style={{ color: '#fff' }}>{listing.region}</span></div>
                  </div>

                  <a href={`/listings/${listing.id}`} className="buy-btn">
                    Secure Account
                  </a>
                </div>

              </div>
            </article>
          ))}
        </div>

      </section>
    {/* PREMIUM REVIEWS SECTION - CS2 */}
      <section style={{ maxWidth: '1200px', margin: '100px auto 0', padding: '0 20px' }}>
        <div style={{ borderTop: '1px solid #222', paddingTop: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>
            ELITE <span style={{ color: '#66FCF1' }}>REVIEWS</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { user: "GlobalElite99", rank: "Verified Buyer", comment: "Premier 20k+ rating account. Everything works perfectly. Instant access.", rating: "⭐⭐⭐⭐⭐" },
              { user: "KnifeCollector", rank: "Verified Buyer", comment: "Safe transaction and the account trust factor is high. Highly recommend.", rating: "⭐⭐⭐⭐⭐" },
              { user: "RushB_DonStop", rank: "Verified Buyer", comment: "Got my smurf account in minutes. Fast and reliable as always.", rating: "⭐⭐⭐⭐⭐" }
            ].map((review, i) => (
              <div key={i} style={{ 
                background: '#111', 
                padding: '30px', 
                borderRadius: '16px', 
                border: '1px solid #222', 
                textAlign: 'left',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <div style={{ color: '#D4AF37', marginBottom: '10px', fontSize: '14px' }}>{review.rating}</div>
                <p style={{ color: '#fff', fontSize: '14px', fontStyle: 'italic', marginBottom: '20px' }}>"{review.comment}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#333' }}></div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 900 }}>{review.user}</div>
                    <div style={{ fontSize: '10px', color: '#66FCF1', textTransform: 'uppercase' }}>{review.rank}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}