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
        
      </body>
    </html>
  )
}