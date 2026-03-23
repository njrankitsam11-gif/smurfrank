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
  return (
    <html lang="en">
      <body style={{ 
        backgroundColor: '#050505', 
        color: '#ffffff', 
        margin: 0, 
        fontFamily: 'Inter, system-ui, sans-serif',
        overflowX: 'hidden'
      }}>
        
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

        {/* MASTER NAVIGATION */}
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
          
          <div style={{ display: 'flex', gap: '30px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <a href="/cs2" style={{ color: '#fff', textDecoration: 'none' }}>CS2</a>
            <a href="/valorant" style={{ color: '#fff', textDecoration: 'none' }}>Valorant</a>
            <a href="/gta-v" style={{ color: '#fff', textDecoration: 'none' }}>GTA V</a>
            <a href="/sell" style={{ color: '#66FCF1', textDecoration: 'none' }}>Sell</a>
            <a href="/boosting" style={{ color: '#9D00FF', textDecoration: 'none' }}>Boosting</a>
          </div>
          
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
        </nav>

        {children}
        {/* --- PREMIUM GLOBAL FOOTER --- */}
        <footer style={{ 
          marginTop: '100px', 
          padding: '80px 5vw 40px', 
          backgroundColor: '#050505', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            
            {/* Column 1: Brand */}
            <div>
              <div style={{ fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>
                SMURF<span style={{ color: '#66FCF1' }}>RANK</span>
              </div>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', maxWidth: '300px' }}>
                The world's most secure marketplace for premium ranked accounts and professional boosting services.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', color: '#fff' }}>Navigation</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <a href="/cs2" style={{ color: '#888', textDecoration: 'none' }}>CS2 Prime</a>
                <a href="/valorant" style={{ color: '#888', textDecoration: 'none' }}>Valorant Radiant</a>
                <a href="/gta-v" style={{ color: '#888', textDecoration: 'none' }}>GTA V Modded</a>
                <a href="/terms" style={{ color: '#D4AF37', textDecoration: 'none' }}>Terms of Service</a>
              </div>
            </div>

            {/* Column 3: Socials (THE SEO SIGNALS) */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', color: '#fff' }}>Connect With Us</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                {/* DISCORD */}
                <a href="YOUR_DISCORD_LINK" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                  <span style={{ fontSize: '18px' }}>💬</span>
                  <span style={{ fontSize: '11px', fontWeight: 800 }}>DISCORD</span>
                </a>
                {/* TELEGRAM */}
                <a href="YOUR_TELEGRAM_LINK" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                  <span style={{ fontSize: '18px' }}>✈️</span>
                  <span style={{ fontSize: '11px', fontWeight: 800 }}>TELEGRAM</span>
                </a>
              </div>
              <p style={{ color: '#444', fontSize: '11px', marginTop: '20px' }}>
                Support available 24/7 via Discord tickets.
              </p>
            </div>

          </div>

          {/* Bottom Bar */}
          <div style={{ 
            maxWidth: '1200px', 
            margin: '60px auto 0', 
            paddingTop: '20px', 
            borderTop: '1px solid #111', 
            textAlign: 'center',
            fontSize: '11px',
            color: '#333',
            letterSpacing: '1px'
          }}>
            © 2026 SMURFRANK. ALL RIGHTS RESERVED. NOT AFFILIATED WITH RIOT GAMES, VALVE, OR ROCKSTAR GAMES.
          </div>
        </footer>
        
      </body>
    </html>
  )
}

const socialIconStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '90px',
  height: '90px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  borderRadius: '12px',
  color: '#fff',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  textAlign: 'center'
};