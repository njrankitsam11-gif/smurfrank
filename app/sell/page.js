export const metadata = {
  title: 'Sell Your Gaming Account | RankVault Marketplace',
  description: 'Sell your Valorant, CS2, or GTA V accounts for the best prices. Secure escrow payments and instant payouts for verified sellers.',
  keywords: ['sell valorant account', 'sell cs2 account', 'how to sell gta 5 modded account', 'gaming account marketplace'],
};

export default function SellPage() {
  const sellerFaqs = [
    { q: 'How do I get paid for selling my account?', a: 'Once a buyer purchases your account, the funds are held in our secure escrow. After the delivery is confirmed, the money is released to your RankVault wallet.' },
    { q: 'What are the fees for selling on RankVault?', a: 'Listing an account is free. We only take a small commission once your account is successfully sold.' },
    { q: 'Can I sell accounts from any region?', a: 'Yes! We support sellers from UAE, NA, EU, SEA, and all other major gaming regions.' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sellerFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid #1a1a1a' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white' }}>
          RANK<span style={{ color: '#FF6A00' }}>VAULT</span>
        </a>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        
        {/* Left Side: The Form */}
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>Sell Your <span style={{ color: '#FF6A00' }}>Account</span></h1>
          <p style={{ color: '#666', marginBottom: '40px' }}>Join 10,000+ verified sellers on the most trusted marketplace.</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Select Game</label>
              <select style={{ padding: '12px', background: '#0f0f17', border: '1px solid #1a1a1a', color: 'white' }}>
                <option>Valorant</option>
                <option>CS2</option>
                <option>GTA V</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Listing Title</label>
              <input type="text" placeholder="e.g. Radiant UAE - 100 Skins" style={{ padding: '12px', background: '#0f0f17', border: '1px solid #1a1a1a', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Asking Price ($)</label>
              <input type="number" placeholder="99.99" style={{ padding: '12px', background: '#0f0f17', border: '1px solid #1a1a1a', color: 'white' }} />
            </div>
            <button type="submit" style={{ background: '#FF6A00', color: '#000', padding: '16px', fontWeight: 900, border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>Submit Listing</button>
          </form>
        </div>

        {/* Right Side: Seller FAQ (The SEO Part) */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '30px' }}>Seller <span style={{ color: '#FF6A00' }}>FAQ</span></h2>
          {sellerFaqs.map((faq) => (
            <div key={faq.q} style={{ marginBottom: '30px', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'white', marginBottom: '10px' }}>{faq.q}</div>
              <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.6' }}>{faq.a}</div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}