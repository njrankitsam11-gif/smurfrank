export const metadata = {
  title: 'Sell Your Gaming Accounts | Fast Payouts & Global Reach',
  description: 'Join the worlds most trusted marketplace for CS2, Valorant, and GTA V accounts. Benefit from escrow protection, 0% listing fees, and instant payouts.',
  keywords: ['sell valorant account safe', 'sell cs2 account for cash', 'best place to sell gaming accounts', 'UAE gaming marketplace'],
};

export default function SellPage() {
  const sellerBenefits = [
    { title: 'Zero Listing Fees', desc: 'It costs $0 to list your account. We only take a fee when you get paid.' },
    { title: 'Escrow Security', desc: 'Your account is never released until the buyers payment is fully secured.' },
    { title: 'Global Audience', desc: 'Market your account to buyers across UAE, NA, EU, and SEA instantly.' },
    { title: 'Rapid Payouts', desc: 'Withdraw your earnings via Stripe, Crypto, or Bank Transfer within 72 hours.' },
  ];

  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Navigation */}
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white' }}>
          SMURF<span style={{ color: '#FF6A00' }}>RANK</span>
        </a>
        <a href="/login" style={{ color: '#999', textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase' }}>Sign In</a>
      </nav>

      {/* Hero Section - Trust Focus */}
      <section style={{ padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(to bottom, #0f0f17 0%, #050507 100%)' }}>
        <div style={{ fontSize: '12px', color: '#FF6A00', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px' }}>Verified Seller Portal</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '24px' }}>
          Turn Your Progress <span style={{ color: '#FF6A00' }}>Into Profit</span>
        </h1>
        <p style={{ color: '#888', fontSize: '18px', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          SmurfRank is the professional standard for account trading. We handle the security, the payment, and the middleman services so you can focus on gaming.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div style={{ padding: '15px 30px', border: '1px solid #1a1a1a', borderRadius: '4px', background: '#0a0a0f' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#FF6A00' }}>10k+</div>
            <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase' }}>Active Sellers</div>
          </div>
          <div style={{ padding: '15px 30px', border: '1px solid #1a1a1a', borderRadius: '4px', background: '#0a0a0f' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#FF6A00' }}>$2M+</div>
            <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase' }}>Paid Out</div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {sellerBenefits.map((benefit, i) => (
          <div key={i} style={{ padding: '30px', background: '#0f0f17', border: '1px solid #1a1a1a' }}>
            <div style={{ color: '#FF6A00', fontWeight: 900, marginBottom: '10px', fontSize: '14px', textTransform: 'uppercase' }}>{benefit.title}</div>
            <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.6 }}>{benefit.desc}</p>
          </div>
        ))}
      </section>

      {/* Form Section */}
      <section style={{ padding: '80px 40px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#0f0f17', border: '1px solid #1a1a1a', padding: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '30px', textAlign: 'center' }}>CREATE YOUR LISTING</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Game Category</label>
              <select style={{ width: '100%', padding: '14px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}>
                <option>Valorant</option>
                <option>CS2</option>
                <option>GTA V</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Account Title (Keywords for SEO)</label>
              <input type="text" placeholder="e.g. Immortal 3 - UAE Server - 50 Skins" style={{ width: '100%', padding: '14px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Your Asking Price ($)</label>
                <input type="number" placeholder="49.99" style={{ width: '100%', padding: '14px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
              </div>
              <div>
                <label style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Region</label>
                <input type="text" placeholder="UAE / NA / EU" style={{ width: '100%', padding: '14px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
              </div>
            </div>
            <button type="submit" style={{ background: '#FF6A00', color: '#000', padding: '18px', fontWeight: 900, border: 'none', cursor: 'pointer', textTransform: 'uppercase', marginTop: '10px' }}>
              Submit for Verification
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}