export const metadata = {
  title: 'Sell Your Account | RankVault',
  description: 'List your CS2, Valorant, or GTA V account for sale and get paid securely.',
};

export default function SellPage() {
  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid #1a1a1a' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white' }}>
          RANK<span style={{ color: '#FF6A00' }}>VAULT</span>
        </a>
      </nav>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>Sell Your <span style={{ color: '#FF6A00' }}>Account</span></h1>
        <p style={{ color: '#666', marginBottom: '40px' }}>Fill out the details below. Our team will review and list your account within 24 hours.</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Game</label>
            <select style={{ padding: '12px', background: '#0f0f17', border: '1px solid #1a1a1a', color: 'white' }}>
              <option>Valorant</option>
              <option>CS2</option>
              <option>GTA V</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Listing Title</label>
            <input type="text" placeholder="e.g. Immortal 3 - 50 Skins - UAE" style={{ padding: '12px', background: '#0f0f17', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Price (USD)</label>
            <input type="number" placeholder="49.99" style={{ padding: '12px', background: '#0f0f17', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Account Region</label>
            <input type="text" placeholder="UAE / NA / EU" style={{ padding: '12px', background: '#0f0f17', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>

          <button type="submit" style={{ background: '#FF6A00', color: '#000', padding: '16px', fontWeight: 900, border: 'none', cursor: 'pointer', textTransform: 'uppercase', marginTop: '10px' }}>Submit Listing for Review</button>
        </form>
      </div>
    </main>
  );
}