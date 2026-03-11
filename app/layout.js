import './globals.css'

export const metadata = {
  title: {
    default: 'SmurfRank | Premium Marketplace for Ranked Accounts & Boosting',
    template: '%s | SmurfRank'
  },
  description: 'The elite marketplace for CS2, Valorant, and GTA V accounts. Professional rank boosting and instant delivery.',
  keywords: ['smurf accounts', 'valorant boosting', 'cs2 prime', 'gta v modded', 'rank boost'],
  metadataBase: new URL('https://smurfrank.vercel.app'),
}

export default function RootLayout({ children }) {
  // --- SEO SCHEMA DATA ---
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SmurfRank",
    "url": "https://smurfrank.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://smurfrank.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <body style={{ 
        backgroundColor: '#050505', 
        color: '#ffffff', 
        margin: 0, 
        fontFamily: 'Inter, system-ui, sans-serif',
        overflowX: 'hidden'
      }}>
        
        {/* 🚀 SEO SCHEMA INJECTION */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* 🪄 GLOBAL AMBIENT GLOWS (3D POP) */}
        <div style={{
          position: 'fixed',
          top: '-10%',
          left: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(102, 252, 241, 0.08) 0%, transparent 70%)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(157, 0, 255, 0.05) 0%, transparent 70%)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />

        {/* 📈 LIVE MARKET FEED - SEO & TRUST SIGNAL */}
        <div style={{ 
          background: '#0a0a0a', 
          borderBottom: '1px solid #111', 
          padding: '8px 0', 
          overflow: 'hidden', 
          whiteSpace: 'nowrap',
          fontSize: '11px',
          fontWeight: 900,
          letterSpacing: '1px',
          color: '#66FCF1',
          zIndex: 1100,
          position: 'relative'
        }}>
          <div style={{ display: 'inline-block', animation: 'scroll 30s linear infinite' }}>
            {[
              "RECENT SALE: CS2 GLOBAL ELITE ACCOUNT - $45.00",
              "RECENT SALE: VALORANT RADIANT PEAK - $120.00",
              "NEW LISTING: GTA V 2BN MODDED - $25.00",
              "BOOST COMPLETED: SILVER TO PLATINUM - $60.00",
              "RECENT SALE: CS2 PRIME MEDAL ACCOUNT - $35.00"
            ].map((text, i) => (
              <span key={i} style={{ margin: '0 50px' }}>
                ● {text}
              </span>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scroll {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}} />
        </div>

        {/* 🛡️ MASTER NAVIGATION */}
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 5vw', 
          height: '80px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'sticky', 
          top: 0, 
          backgroundColor: 'rgba(5, 5, 5, 0.8)', 
          backdropFilter: 'blur(20px)', 
          zIndex: 1000 
        }}>
          <a href="/" style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: '#fff', letterSpacing: '-1px' }}>
            SMURF<span style={{ color: '#66FCF1' }}>RANK</span>
          </a>
          
          <div style={{ display: 'flex', gap: '30px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <a href="/cs2" style={{ color: '#fff', textDecoration: 'none' }}>CS2</a>
            <a href="/valorant" style={{ color: '#fff', textDecoration: 'none' }}>Valorant</a>
            <a href="/gta-v" style={{ color: '#fff', textDecoration: 'none' }}>GTA V</a>
            <a href="/sell" style={{ color: '#66FCF1', textDecoration: 'none' }}>Sell</a>
            <a href="/boosting" style={{ color: '#9D00FF', textDecoration: 'none' }}>Boosting</a>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* 🛒 CART BUTTON */}
            <button 
              onClick={() => document.getElementById('cart-drawer').style.right = '0'}
              style={{
                background: 'none',
                border: '1px solid rgba(102, 252, 241, 0.2)',
                color: '#fff',
                padding: '10px 18px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '15px',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                transition: '0.3s'
              }}
            >
              🛒 Cart (0)
            </button>
            
            <a href="/login" style={{ 
              background: 'linear-gradient(45deg, #66FCF1, #45A29E)', 
              color: '#000', 
              padding: '10px 24px', 
              borderRadius: '4px', 
              fontWeight: 800, 
              textDecoration: 'none', 
              fontSize: '12px', 
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(102, 252, 241, 0.2)'
            }}>
              Sign In
            </a>
          </div>
        </nav>

        {/* 🛒 MATTE CART DRAWER */}
        <div id="cart-drawer" style={{
          position: 'fixed', right: '-400px', top: 0, width: '350px', height: '100vh',
          background: 'rgba(10, 10, 10, 0.98)', backdropFilter: 'blur(30px)',
          borderLeft: '1px solid #222', zIndex: 2000, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '40px 20px', boxShadow: '-20px 0 50px rgba(0,0,0,0.8)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}>YOUR <span style={{ color: '#66FCF1' }}>CART</span></h2>
            <button onClick={() => document.getElementById('cart-drawer').style.right = '-400px'} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px' }}>✕</button>
          </div>

          <div style={{ flexGrow: 1, color: '#444', textAlign: 'center', marginTop: '50px' }}>
            Your cart is currently empty.
          </div>

          {/* 🏷️ COUPON SECTION */}
          <div style={{ marginTop: 'auto', borderTop: '1px solid #222', paddingTop: '30px', position: 'absolute', bottom: '120px', width: '310px' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, color: '#666', marginBottom: '12px', letterSpacing: '1px' }}>HAVE A PROMO CODE?</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="ENTER CODE" style={{ 
                background: '#0a0a0a', border: '1px solid #333', color: '#fff', 
                padding: '12px', borderRadius: '4px', flex: 1, fontSize: '12px', outline: 'none'
              }} />
              <button style={{ 
                background: '#66FCF1', color: '#000', border: 'none', 
                padding: '0 20px', fontWeight: 900, fontSize: '11px', borderRadius: '4px', cursor: 'pointer'
              }}>APPLY</button>
            </div>
          </div>

          <button style={{ 
            width: '310px', position: 'absolute', bottom: '40px', padding: '18px', 
            background: 'linear-gradient(45deg, #D4AF37, #F9E076)', border: 'none', color: '#000',
            fontWeight: 900, borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px'
          }}>Proceed to Checkout</button>
        </div>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* 🏢 PREMIUM GLOBAL FOOTER */}
        <footer style={{ 
          marginTop: '100px', padding: '80px 5vw 40px', backgroundColor: '#050505', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', zIndex: 10
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', maxWidth: '1200px', margin: '0 auto' }}>
            
            <div>
              <div style={{ fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>
                SMURF<span style={{ color: '#66FCF1' }}>RANK</span>
              </div>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.8', maxWidth: '300px' }}>
                The world's most secure marketplace for premium ranked accounts and professional boosting services. Trusted by 50,000+ gamers.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px', color: '#fff' }}>Marketplace</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px' }}>
                <a href="/cs2" 
                   onMouseOver={(e) => e.target.style.color = '#66FCF1'} 
                   onMouseOut={(e) => e.target.style.color = '#888'} 
                   style={{ color: '#888', textDecoration: 'none', transition: '0.3s' }}>CS2 Prime Accounts</a>
                <a href="/valorant" 
                   onMouseOver={(e) => e.target.style.color = '#66FCF1'} 
                   onMouseOut={(e) => e.target.style.color = '#888'} 
                   style={{ color: '#888', textDecoration: 'none', transition: '0.3s' }}>Valorant Smurfs</a>
                <a href="/gta-v" 
                   onMouseOver={(e) => e.target.style.color = '#66FCF1'} 
                   onMouseOut={(e) => e.target.style.color = '#888'} 
                   style={{ color: '#888', textDecoration: 'none', transition: '0.3s' }}>GTA V Modded</a>
                <a href="/terms" 
                   onMouseOver={(e) => e.target.style.color = '#D4AF37'} 
                   onMouseOut={(e) => e.target.style.color = '#888'} 
                   style={{ color: '#888', textDecoration: 'none', transition: '0.3s' }}>Terms & Warranty</a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px', color: '#fff' }}>Support & Socials</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="#" style={socialIconStyle}>💬 Discord</a>
                <a href="#" style={socialIconStyle}>✈️ Telegram</a>
              </div>
              <p style={{ color: '#444', fontSize: '11px', marginTop: '30px', lineHeight: '1.6' }}>
                24/7 Live Support available for all orders.<br/>Average delivery time: 2 minutes.
              </p>
            </div>

          </div>

          <div style={{ 
            maxWidth: '1200px', margin: '80px auto 0', paddingTop: '30px', 
            borderTop: '1px solid #111', textAlign: 'center', fontSize: '10px', 
            color: '#333', letterSpacing: '2px', textTransform: 'uppercase' 
          }}>
            © 2026 SMURFRANK. ALL RIGHTS RESERVED. NO AFFILIATION WITH RIOT, VALVE, OR ROCKSTAR.
          </div>
        </footer>
        
      </body>
    </html>
  )
}

const socialIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '130px',
  height: '45px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  borderRadius: '4px',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '11px',
  fontWeight: 800,
  transition: '0.3s'
};