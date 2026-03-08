import { prisma } from '../../../lib/prisma';

export default async function ListingPage({ params }) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: { id },
  }) || {
    title: 'Account Not Found',
    game: '',
    rank: '',
    region: '',
    price: 0,
    level: '0',
    wins: '0',
    hours: '0',
    type: '',
    instant: false,
    description: 'This listing does not exist.',
    includes: [],
  };

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>

      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, backgroundColor: '#050507', zIndex: 100}}>
        <a href="/" style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </a>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px'}}>
          <a href="/cs2" style={{color: '#999', textDecoration: 'none'}}>CS2</a>
          <a href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#999', textDecoration: 'none'}}>GTA V</a>
        </div>
        <a href="/login" style={{background: '#FF6A00', color: '#000', padding: '8px 20px', fontWeight: 700, textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'}}>Sign In</a>
      </nav>

      <div style={{padding: '16px 40px', borderBottom: '1px solid #1a1a1a', fontSize: '12px', color: '#666'}}>
        <a href="/" style={{color: '#666', textDecoration: 'none'}}>Home</a>
        <span style={{margin: '0 8px'}}>→</span>
        <span style={{color: '#999'}}>{listing.game}</span>
        <span style={{margin: '0 8px'}}>→</span>
        <span style={{color: '#FF6A00'}}>{listing.title}</span>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px'}}>
        <div>
          <div style={{background: '#0f0f17', border: '1px solid #1a1a1a', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', fontSize: '80px'}}>🎮</div>
          <h1 style={{fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px'}}>{listing.title}</h1>
          <div style={{display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap'}}>
            <span style={{background: 'rgba(255,106,0,0.1)', color: '#FF6A00', padding: '4px 12px', fontSize: '12px', border: '1px solid rgba(255,106,0,0.3)'}}>{listing.rank}</span>
            <span style={{background: '#0f0f17', color: '#999', padding: '4px 12px', fontSize: '12px', border: '1px solid #1a1a1a'}}>{listing.region}</span>
            <span style={{background: '#0f0f17', color: '#999', padding: '4px 12px', fontSize: '12px', border: '1px solid #1a1a1a'}}>{listing.type}</span>
            {listing.instant && <span style={{background: 'rgba(0,230,118,0.1)', color: '#00E676', padding: '4px 12px', fontSize: '12px', border: '1px solid rgba(0,230,118,0.3)'}}>⚡ Instant Delivery</span>}
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a', marginBottom: '24px'}}>
            {[{label: 'Level', value: listing.level}, {label: 'Wins', value: listing.wins}, {label: 'Hours', value: listing.hours}].map((stat) => (
              <div key={stat.label} style={{background: '#0f0f17', padding: '20px', textAlign: 'center'}}>
                <div style={{fontSize: '28px', fontWeight: 900, color: '#FF6A00'}}>{stat.value}</div>
                <div style={{fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px'}}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px', marginBottom: '24px'}}>
            <div style={{fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#FF6A00', marginBottom: '12px'}}>Description</div>
            <p style={{color: '#999', fontSize: '14px', lineHeight: '1.8'}}>{listing.description}</p>
          </div>
          <div style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px'}}>
            <div style={{fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#FF6A00', marginBottom: '16px'}}>What's Included</div>
            {listing.includes.map((item) => (
              <div key={item} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #111', fontSize: '14px', color: '#ccc'}}>
                <span style={{color: '#00E676'}}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px', position: 'sticky', top: '80px'}}>
            <div style={{fontSize: '42px', fontWeight: 900, color: '#FF6A00', marginBottom: '4px'}}>${listing.price}</div>
            <div style={{fontSize: '12px', color: '#666', marginBottom: '24px'}}>One-time payment · No subscription</div>
            <button style={{width: '100%', background: '#FF6A00', color: '#000', border: 'none', padding: '16px', fontWeight: 900, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', marginBottom: '12px'}}>Buy Now</button>
            <button style={{width: '100%', background: 'transparent', color: 'white', border: '1px solid #333', padding: '14px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '24px'}}>Add to Wishlist</button>
            <div style={{borderTop: '1px solid #1a1a1a', paddingTop: '20px'}}>
              {[{icon: '🔒', text: 'Escrow Protected'}, {icon: '⚡', text: 'Instant Delivery'}, {icon: '✅', text: 'Verified Seller'}, {icon: '🛡️', text: '24/7 Support'}].map((item) => (
                <div key={item.text} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', fontSize: '13px', color: '#999'}}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer style={{padding: '40px', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: '40px'}}>
        <div style={{fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '16px'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </div>
        <div style={{color: '#333', fontSize: '13px'}}>© 2025 SmurfRank. All rights reserved.</div>
      </footer>

    </main>
  );
}