export default function Home() {
  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      
      {/* NAVBAR */}
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, backgroundColor: '#050507', zIndex: 100}}>
        <div style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </div>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px', color: '#999'}}>
          <a href="/cs2" style={{color: '#999', textDecoration: 'none'}}>CS2</a>
          <a href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#999', textDecoration: 'none'}}>GTA V</a>
        </div>
        <a href="/login" style={{background: '#FF6A00', color: '#000', padding: '8px 20px', fontWeight: 700, textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'}}>Sign In</a>
      </nav>

      {/* HERO */}
      <section style={{textAlign: 'center', padding: '100px 20px 80px'}}>
        <div style={{fontSize: '13px', color: '#FF6A00', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px'}}>Trusted by 10,000+ Gamers Worldwide</div>
        <h1 style={{fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 20px', lineHeight: 1}}>
          Buy Ranked<br/><span style={{color: '#FF6A00'}}>Smurf Accounts</span>
        </h1>
        <p style={{color: '#666', fontSize: '18px', maxWidth: '500px', margin: '0 auto 40px'}}>
          CS2 · Valorant · GTA V — Instant delivery, escrow protected, verified sellers
        </p>
        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="/cs2" style={{background: '#FF6A00', color: '#000', padding: '16px 40px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px'}}>Browse Accounts</a>
          <a href="/how-it-works" style={{background: 'transparent', color: 'white', padding: '16px 40px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', border: '1px solid #333'}}>How It Works</a>
        </div>
      </section>

      {/* GAME CARDS */}
      <section style={{padding: '60px 40px', maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{textAlign: 'center', fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px'}}>
          Browse by <span style={{color: '#FF6A00'}}>Game</span>
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
          
          {/* CS2 Card */}
          <a href="/cs2" style={{textDecoration: 'none', background: '#0f0f17', border: '1px solid #1a1a1a', padding: '32px', display: 'block', transition: 'border-color 0.2s'}}>
            <div style={{fontSize: '40px', marginBottom: '16px'}}>🎯</div>
            <div style={{fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '8px'}}>Counter-Strike 2</div>
            <div style={{fontSize: '13px', color: '#666', marginBottom: '20px'}}>Prime · Non-Prime · High Rank · Faceit accounts</div>
            <div style={{color: '#FF6A00', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px'}}>Browse CS2 →</div>
          </a>

          {/* Valorant Card */}
          <a href="/valorant" style={{textDecoration: 'none', background: '#0f0f17', border: '1px solid #1a1a1a', padding: '32px', display: 'block'}}>
            <div style={{fontSize: '40px', marginBottom: '16px'}}>⚡</div>
            <div style={{fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '8px'}}>Valorant</div>
            <div style={{fontSize: '13px', color: '#666', marginBottom: '20px'}}>Iron · Bronze · Gold · Platinum · Diamond · Immortal · Radiant</div>
            <div style={{color: '#FF6A00', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px'}}>Browse Valorant →</div>
          </a>

          {/* GTA V Card */}
          <a href="/gta-v" style={{textDecoration: 'none', background: '#0f0f17', border: '1px solid #1a1a1a', padding: '32px', display: 'block'}}>
            <div style={{fontSize: '40px', marginBottom: '16px'}}>🏎️</div>
            <div style={{fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '8px'}}>GTA V</div>
            <div style={{fontSize: '13px', color: '#666', marginBottom: '20px'}}>Modded · High Level · Money · Unlockables included</div>
            <div style={{color: '#FF6A00', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px'}}>Browse GTA V →</div>
          </a>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{padding: '60px 40px', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', marginTop: '40px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center'}}>
          <div>
            <div style={{fontSize: '42px', fontWeight: 900, color: '#FF6A00'}}>10K+</div>
            <div style={{fontSize: '13px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px'}}>Accounts Sold</div>
          </div>
          <div>
            <div style={{fontSize: '42px', fontWeight: 900, color: '#FF6A00'}}>5★</div>
            <div style={{fontSize: '13px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px'}}>Average Rating</div>
          </div>
          <div>
            <div style={{fontSize: '42px', fontWeight: 900, color: '#FF6A00'}}>instant</div>
            <div style={{fontSize: '13px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px'}}>Delivery</div>
          </div>
          <div>
            <div style={{fontSize: '42px', fontWeight: 900, color: '#FF6A00'}}>24/7</div>
            <div style={{fontSize: '13px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px'}}>Support</div>
          </div>
        </div>
      </section>

 {/* SEO CONTENT */}
      <section style={{padding: '60px 40px', maxWidth: '900px', margin: '0 auto'}}>
        <h2 style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '24px'}}>
          Buy Smurf Accounts — <span style={{color: '#FF6A00'}}>Safe, Fast & Cheap</span>
        </h2>
        <p style={{color: '#666', fontSize: '14px', lineHeight: '1.8', marginBottom: '16px'}}>
          SmurfRank is the most trusted marketplace to buy CS2 smurf accounts, Valorant smurf accounts, and GTA V modded accounts. All accounts are verified by our team before listing. We offer instant delivery across all regions including UAE, NA, EU, SEA, and SA.
        </p>
        <p style={{color: '#666', fontSize: '14px', lineHeight: '1.8', marginBottom: '16px'}}>
          Whether you're looking for a cheap CS2 Prime account, a high-ranked Valorant account, or a GTA V modded account with millions in cash — SmurfRank has you covered. All purchases are escrow protected, meaning your money is safe until you receive your account.
        </p>
        <p style={{color: '#666', fontSize: '14px', lineHeight: '1.8'}}>
          Our verified sellers offer accounts for all skill levels — from CS2 Gold Nova to Global Elite, Valorant Silver to Radiant, and GTA V Level 100 to Level 8000. Buy with confidence knowing every account comes with 24/7 support and instant delivery.
        </p>
      </section>
      {/* FOOTER */}
      <footer style={{padding: '40px', textAlign: 'center', color: '#333', fontSize: '13px'}}>
        <div style={{fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '16px'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </div>
        <div style={{display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap'}}>
          <a href="/cs2" style={{color: '#666', textDecoration: 'none'}}>CS2</a>
          <a href="/valorant" style={{color: '#666', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#666', textDecoration: 'none'}}>GTA V</a>
          <a href="/terms" style={{color: '#666', textDecoration: 'none'}}>Terms</a>
          <a href="/privacy" style={{color: '#666', textDecoration: 'none'}}>Privacy</a>
        </div>
        <div style={{color: '#333'}}>© 2025 SmurfRank. All rights reserved.</div>
      </footer>

    </main>
  )
}