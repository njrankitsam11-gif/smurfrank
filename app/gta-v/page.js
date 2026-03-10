import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy GTA V Modded Accounts | Billions & Max Rank',
  description: 'Get the ultimate GTA V experience with modded accounts. Billions in cash, all unlocks, and max level. Instant delivery for PC and Console.',
};

const gtaImages = [
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1580234811497-9bd7fd2f357d?auto=format&fit=crop&w=600&q=80',
];

export default async function GTAVPage() {
  const listings = await prisma.listing.findMany({
    where: { game: { contains: 'GTA', mode: 'insensitive' }, active: true },
    orderBy: { price: 'asc' },
  });

  return (
    <main style={{ minHeight: '100vh', padding: '60px 20px', backgroundColor: '#050507' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .flip-container { perspective: 1000px; height: 420px; width: 100%; }
        .flip-inner { position: relative; width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d; cursor: pointer; }
        .flip-container:hover .flip-inner { transform: rotateY(180deg); }
        .flip-front, .flip-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 16px; overflow: hidden; border: 1px solid #1a1a1a; }
        .flip-front { display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; background-color: #0f0f17; }
        .flip-front::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(0,255,102,0.1) 0%, #050507 100%); z-index: 1; }
        .flip-back { background: linear-gradient(145deg, #0f0f17 0%, #050507 100%); transform: rotateY(180deg); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; border: 1px solid #00FF66; box-shadow: 0 15px 40px rgba(0, 255, 102, 0.2); text-align: center; }
        .buy-btn { background: #00FF66; color: #000; padding: 12px 30px; font-weight: 900; text-transform: uppercase; text-decoration: none; border-radius: 8px; margin-top: 20px; }
      `}} />

      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: '60px' }}>
          GTA V <span style={{ color: '#00FF66' }}>MODDED</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {listings.map((listing, index) => (
            <article key={listing.id} className="flip-container">
              <div className="flip-inner">
                <div className="flip-front" style={{ backgroundImage: `url(${gtaImages[index % gtaImages.length]})`, backgroundSize: 'cover' }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 900 }}>{listing.title}</h2>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#00FF66' }}>${Number(listing.price).toFixed(2)}</div>
                  </div>
                </div>
                <div className="flip-back">
                  <h3 style={{ color: '#00FF66', fontWeight: 900, marginBottom: '10px' }}>MOD MENU STATUS</h3>
                  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '20px' }}>{listing.description || 'High level GTA account with maxed assets.'}</p>
                  <div style={{ fontSize: '12px', color: '#fff', borderTop: '1px solid #333', paddingTop: '10px', width: '100%' }}>
                    CASH: {listing.rank} | PLATFORM: {listing.region}
                  </div>
                  <a href={`/listings/${listing.id}`} className="buy-btn">Claim Account</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    {/* PREMIUM REVIEWS SECTION */}
      <section style={{ maxWidth: '1200px', margin: '100px auto 0', padding: '0 20px' }}>
        <div style={{ borderTop: '1px solid #222', paddingTop: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>
            RECENT <span style={{ color: '#00FF66' }}>FEEDBACK</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { user: "HeistMaster", rank: "Verified Buyer", comment: "Account had the billions as promised. Best price on the market.", rating: "⭐⭐⭐⭐⭐" },
              { user: "LosSantosKing", rank: "Verified Buyer", comment: "Modded stats are legit. Fast delivery, took less than 5 minutes.", rating: "⭐⭐⭐⭐⭐" },
              { user: "CEO_Gamer", rank: "Verified Buyer", comment: "Safe and secure. Highly recommend for high-level accounts.", rating: "⭐⭐⭐⭐⭐" }
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
                    <div style={{ fontSize: '10px', color: '#00FF66', textTransform: 'uppercase' }}>{review.rank}</div>
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