import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | RankVault',
};

export default function DashboardPage() {
  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Sidebar / Top Nav Mockup */}
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white' }}>
          RANK<span style={{ color: '#FF6A00' }}>VAULT</span>
        </Link>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
          <span style={{ color: '#666' }}>Welcome, <strong style={{ color: 'white' }}>User</strong></span>
          <Link href="/login" style={{ color: '#FF6A00', textDecoration: 'none' }}>Logout</Link>
        </div>
      </nav>

      <div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>Account <span style={{ color: '#FF6A00' }}>Overview</span></h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Card 1: My Purchases */}
          <div style={{ background: '#0f0f17', border: '1px solid #1a1a1a', padding: '30px' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#FF6A00', marginBottom: '15px' }}>My Purchases</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>You haven&apos;t purchased any accounts yet.</p>
            <Link href="/search" style={{ display: 'inline-block', marginTop: '20px', color: 'white', fontSize: '12px', fontWeight: 700 }}>Browse Store →</Link>
          </div>

          {/* Card 2: Wallet */}
          <div style={{ background: '#0f0f17', border: '1px solid #1a1a1a', padding: '30px' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#FF6A00', marginBottom: '15px' }}>Wallet Balance</h3>
            <div style={{ fontSize: '36px', fontWeight: 900 }}>$0.00</div>
            <button style={{ marginTop: '20px', background: 'transparent', border: '1px solid #333', color: 'white', padding: '8px 16px', fontSize: '11px', cursor: 'pointer' }}>Add Funds</button>
          </div>
        </div>
      </div>
    </main>
  );
}