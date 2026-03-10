import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Buy Valorant Smurf Accounts | Radiant & Immortal Ranked',
  description: 'Premium Valorant accounts with rare skins and high ranks. Instant delivery, full email access, and hand-leveled security guaranteed.',
};

const valorantImages = [
  'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1614027164847-1b2809eb189d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
];

export default async function ValorantPage() {
  const listings = await prisma.listing.findMany({
    where: { game: { contains: 'Valorant', mode: 'insensitive' }, active: true },
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
        .flip-front::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(5,5,7,0.1) 0%, #050507 100%); z-index: 1; }
        .flip-back { background: linear-gradient(145deg, #0f0f17 0%, #050507 100%); transform: rotateY(180deg); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; border: 1px solid #66FCF1; box-shadow: 0 15px 40px rgba(102, 252, 241, 0.2); text-align: center; }
        .buy-btn { background: #66FCF1; color: #000; padding: 12px 30px; font-weight: 900; text-transform: uppercase; text-decoration: none; border-radius: 8px; margin-top: 20px; }
      `}} />

      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: '60px' }}>
          VALORANT <span style={{ color: '#66FCF1' }}>AGENTS</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {listings.map((listing, index) => (
            <article key={listing.id} className="flip-container">
              <div className="flip-inner">
                <div className="flip-front" style={{ backgroundImage: `url(${valorantImages[index % valorantImages.length]})`, backgroundSize: 'cover' }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 900 }}>{listing.title}</h2>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#66FCF1' }}>${Number(listing.price).toFixed(2)}</div>
                  </div>
                </div>
                <div className="flip-back">
                  <h3 style={{ color: '#66FCF1', fontWeight: 900, marginBottom: '10px' }}>ACCOUNT DOSSIER</h3>
                  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '20px' }}>{listing.description || 'Verified Valorant account with full access.'}</p>
                  <div style={{ fontSize: '12px', color: '#fff', borderTop: '1px solid #333', paddingTop: '10px', width: '100%' }}>
                    RANK: {listing.rank} | REGION: {listing.region}
                  </div>
                  <a href={`/listings/${listing.id}`} className="buy-btn">Inspect</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}