import './globals.css'

export const metadata = {
  title: 'SmurfRank | Premium Ranked Accounts',
  description: 'Buy premium CS2, Valorant, and GTA V accounts. Instant delivery.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#050507', color: 'white', margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        
        {/* MASTER NAVIGATION BAR - IT WILL NEVER DISAPPEAR */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '70px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', position: 'sticky', top: 0, backgroundColor: 'rgba(5, 5, 7, 0.95)', backdropFilter: 'blur(8px)', zIndex: 1000 }}>
          
          <a href="/" style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white', letterSpacing: '-0.5px' }}>
            SMURF<span style={{ color: '#FF6A00' }}>RANK</span>
          </a>
          
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <a href="/cs2" style={{ color: '#e2e8f0', textDecoration: 'none' }}>CS2</a>
            <a href="/valorant" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Valorant</a>
            <a href="/gta-v" style={{ color: '#e2e8f0', textDecoration: 'none' }}>GTA V</a>
            {/* The new Seller hook you requested */}
            <a href="/sell" style={{ color: '#00FF66', textDecoration: 'none' }}>Sell With Us</a>
          </div>
          
          <a href="/login" style={{ background: 'linear-gradient(45deg, #FF6A00, #e65c00)', color: '#000', padding: '10px 24px', borderRadius: '4px', fontWeight: 800, textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 15px rgba(255, 106, 0, 0.2)' }}>
            Sign In
          </a>
          
        </nav>

        {/* This is where your individual pages will load */}
        {children}
        
      </body>
    </html>
  )
}