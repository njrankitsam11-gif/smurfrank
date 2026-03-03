export default function CS2Page() {
  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      
      {/* NAVBAR */}
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

      {/* PAGE HERO */}
      <section style={{padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{fontSize: '12px', color: '#FF6A00', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px'}}>
          🎯 Counter-Strike 2
        </div>
        <h1 style={{fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 16px', lineHeight: 1}}>
          Buy CS2 <span style={{color: '#FF6A00'}}>Smurf Accounts</span>
        </h1>
        <p style={{color: '#666', fontSize: '16px', maxWidth: '600px', marginBottom: '40px'}}>
          Prime & Non-Prime CS2 accounts. Instant delivery, all regions — UAE, NA, EU, SEA, SA. Verified sellers only.
        </p>

        {/* FILTER BAR */}
        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px'}}>
          {['All Accounts', 'Prime', 'Non-Prime', 'High Rank', 'Faceit', 'UAE', 'NA', 'EU', 'SEA'].map((filter) => (
            <button key={filter} style={{background: filter === 'All Accounts' ? '#FF6A00' : '#0f0f17', color: filter === 'All Accounts' ? '#000' : '#999', border: '1px solid #1a1a1a', padding: '8px 16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer'}}>
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* LISTINGS GRID */}
      <section style={{padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
          
          {[
            {title: 'CS2 Prime Account', rank: 'Gold Nova', region: 'UAE 🇦🇪', price: '$14.99', badge: '⚡ Instant'},
            {title: 'CS2 Prime Account', rank: 'Master Guardian', region: 'EU 🇪🇺', price: '$19.99', badge: '⚡ Instant'},
            {title: 'CS2 Faceit Account', rank: 'Faceit Lvl 5', region: 'NA 🇺🇸', price: '$24.99', badge: '⚡ Instant'},
            {title: 'CS2 Prime Account', rank: 'Legendary Eagle', region: 'SEA 🌏', price: '$29.99', badge: '⚡ Instant'},
            {title: 'CS2 High Rank', rank: 'Supreme', region: 'UAE 🇦🇪', price: '$39.99', badge: '⚡ Instant'},
            {title: 'CS2 Faceit Account', rank: 'Faceit Lvl 8', region: 'EU 🇪🇺', price: '$49.99', badge: '⚡ Instant'},
          ].map((listing, i) => (
            <div key={i} style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '24px', position: 'relative'}}>
              <div style={{position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,106,0,0.1)', color: '#FF6A00', fontSize: '11px', padding: '3px 8px', border: '1px solid rgba(255,106,0,0.3)'}}>
                {listing.badge}
              </div>
              <div style={{fontSize: '32px', marginBottom: '12px'}}>🎯</div>
              <div style={{fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px'}}>{listing.title}</div>
              <div style={{fontSize: '13px', color: '#FF6A00', marginBottom: '4px'}}>{listing.rank}</div>
              <div style={{fontSize: '12px', color: '#666', marginBottom: '20px'}}>{listing.region}</div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{fontSize: '24px', fontWeight: 900, color: '#FF6A00'}}>{listing.price}</div>
                <button style={{background: '#FF6A00', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer'}}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* SEO TEXT BLOCK */}
      <section style={{padding: '60px 40px', borderTop: '1px solid #1a1a1a', maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px'}}>
          Buy CS2 Smurf Accounts — <span style={{color: '#FF6A00'}}>Safe & Instant</span>
        </h2>
        <p style={{color: '#666', fontSize: '14px', lineHeight: '1.8', maxWidth: '800px'}}>
          SmurfRank offers the best CS2 smurf accounts at the lowest prices. All accounts are Prime or Non-Prime verified, 
          with instant delivery across UAE, NA, EU, SEA and SA regions. Our verified sellers provide high-rank CS2 accounts 
          including Gold Nova, Master Guardian, Legendary Eagle, Supreme and Global Elite. Buy your CS2 account safely with 
          escrow protection and 24/7 support.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{padding: '40px', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: '40px'}}>
        <div style={{fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '16px'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </div>
        <div style={{color: '#333', fontSize: '13px'}}>© 2025 SmurfRank. All rights reserved.</div>
      </footer>

    </main>
  )
}