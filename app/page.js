export default function Home() {
  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'}}>
      <div style={{textAlign: 'center', color: 'white', padding: '20px'}}>
        <h1 style={{fontSize: '80px', fontWeight: 900, textTransform: 'uppercase', margin: 0}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </h1>
        <p style={{color: '#FF6A00', fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '8px'}}>
          CS2 · Valorant · GTA V
        </p>
        <p style={{color: '#999', fontSize: '18px', marginTop: '16px'}}>
          Buy Ranked & Smurf Accounts — UAE · NA · EU · SEA · SA
        </p>
        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap'}}>
          <a href="/cs2" style={{background: '#FF6A00', color: '#000', padding: '14px 32px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px'}}>CS2 Accounts</a>
          <a href="/valorant" style={{background: 'transparent', color: 'white', padding: '14px 32px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', border: '1px solid #333'}}>Valorant Accounts</a>
          <a href="/gta-v" style={{background: 'transparent', color: 'white', padding: '14px 32px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', border: '1px solid #333'}}>GTA V Accounts</a>
        </div>
      </div>
    </main>
  )
}