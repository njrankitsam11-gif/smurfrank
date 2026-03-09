import { prisma } from '../lib/prisma';

export const metadata = {
  title: 'RankVault | Buy Ranked Gaming Accounts - UAE, NA, EU & SEA',
  description: 'The #1 marketplace for CS2, Valorant, and GTA V smurf accounts. Safe escrow protection, instant delivery, and verified sellers globally.',
  keywords: ['buy smurf accounts', 'ranked gaming accounts', 'CS2 prime accounts UAE', 'Valorant smurfs'],
};

export default async function HomePage() {
  // Fetch a few featured listings to show life on the homepage
  const featuredListings = await prisma.listing.findMany({
    where: { active: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  const faqs = [
    { q: 'Why choose RankVault for smurf accounts?', a: 'RankVault offers the most secure marketplace with instant delivery, verified sellers, and full escrow protection for every purchase.' },
    { q: 'How does the escrow protection work?', a: 'Your payment is held securely by our platform until you verify the account credentials. Only then are the funds released to the seller.' },
    { q: 'Can I buy accounts for specific regions like UAE or NA?', a: 'Yes, we specialize in multi-region accounts. You can filter by UAE, North America, Europe, and more for all major games.' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RankVault",
    "url": "https://smurfrank.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://smurfrank.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Navigation */}
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a', backgroundColor: '#050507'}}>
        <a href="/" style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </a>
        <div style={{display: 'flex', gap: '32px', fontSize: '13px'}}>
          <a href="/cs2" style={{color: '#999', textDecoration: 'none'}}>CS2</a>
          <a href="/valorant" style={{color: '#999', textDecoration: 'none'}}>Valorant</a>
          <a href="/gta-v" style={{color: '#999', textDecoration: 'none'}}>GTA V</a>
        </div>
        <a href="/login" style={{background: '#FF6A00', color: '#000', padding: '8px 20px', fontWeight: 700, textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase'}}>Sign In</a>
      </nav>

      {/* Hero Section - Blueprint Section 06 */}
      <section style={{padding: '120px 40px 80px', textAlign: 'center', background: 'radial-gradient(circle at top, rgba(255,106,0,0.05) 0%, transparent 70%)'}}>
        <div style={{fontSize: '12px', color: '#FF6A00', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px'}}>Technical Architecture v1.0</div>
        <h1 style={{fontSize: 'clamp(40px, 8vw, 100px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '24px'}}>
          The Ultimate <span style={{color: '#FF6A00'}}>Marketplace</span><br/>for Ranked Accounts
        </h1>
        <p style={{color: '#888', fontSize: '20px', maxWidth: '800px', margin: '0 auto 40px'}}>
          Secure, instant, and verified. Skip the grind in CS2, Valorant, and GTA V with our premium account selection.
        </p>
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
          <a href="/cs2" style={{background: '#FF6A00', color: '#000', padding: '16px 32px', fontWeight: 900, textDecoration: 'none', textTransform: 'uppercase'}}>Browse Games</a>
          <a href="/sell" style={{border: '1px solid #333', color: 'white', padding: '16px 32px', fontWeight: 900, textDecoration: 'none', textTransform: 'uppercase'}}>Start Selling</a>
        </div>
      </section>

      {/* Trust Banner - Blueprint Section 08 */}
      <section style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', backgroundColor: '#1a1a1a', borderY: '1px solid #1a1a1a'}}>
        {[
          {title: 'Instant Delivery', desc: 'Credentials delivered in minutes'},
          {title: 'Escrow Protection', desc: 'Money safe until you verify'},
          {title: 'Verified Sellers', desc: 'Strict KYC & Trust standards'},
          {title: '24/7 Support', desc: 'Dedicated dispute mediation'},
        ].map((item, i) => (
          <div key={i} style={{backgroundColor: '#050507', padding: '30px', textAlign: 'center'}}>
            <div style={{color: '#FF6A00', fontWeight: 900, marginBottom: '8px', textTransform: 'uppercase', fontSize: '14px'}}>{item.title}</div>
            <div style={{color: '#666', fontSize: '13px'}}>{item.desc}</div>
          </div>
        ))}
      </section>

      {/* SEO Content Block - Blueprint Section 09 */}
      <section style={{padding: '100px 40px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center'}}>
          <div>
            <h2 style={{fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '24px'}}>
              Why SmurfRank is the <span style={{color: '#FF6A00'}}>Gold Standard</span>
            </h2>
            <p style={{color: '#888', lineHeight: 1.8, marginBottom: '20px'}}>
              Navigating the world of gaming accounts can be risky. SmurfRank was built to eliminate that risk. Our platform features an <strong>advanced escrow system</strong> that protects buyers from fraud and ensures sellers get paid for their high-quality work.
            </p>
            <p style={{color: '#888', lineHeight: 1.8}}>
              From <strong>Valorant Radiant accounts</strong> in the UAE to <strong>CS2 Prime Smurfs</strong> in North America, we provide a localized experience with global reach.
            </p>
          </div>
          <div style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '40px'}}>
            <div style={{fontSize: '48px', fontWeight: 900, color: '#FF6A00', marginBottom: '10px'}}>250K+</div>
            <div style={{color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px'}}>Accounts Sold Globally</div>
            <hr style={{border: 'none', borderTop: '1px solid #1a1a1a', margin: '20px 0'}}/>
            <div style={{fontSize: '48px', fontWeight: 900, color: '#FF6A00', marginBottom: '10px'}}>10K+</div>
            <div style={{color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px'}}>Verified Active Sellers</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{padding: '60px 40px', maxWidth: '900px', margin: '0 auto'}}>
        <h2 style={{fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: '60px'}}>Common Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.q} style={{borderBottom: '1px solid #1a1a1a', paddingBottom: '30px', marginBottom: '30px'}}>
            <div style={{fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '12px'}}>{faq.q}</div>
            <div style={{fontSize: '15px', color: '#666', lineHeight: '1.8'}}>{faq.a}</div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{padding: '80px 40px', borderTop: '1px solid #1a1a1a', textAlign: 'center'}}>
        <div style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '24px'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </div>
        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px'}}>
          <a href="/terms" style={{color: '#333', textDecoration: 'none', fontSize: '12px'}}>Terms of Service</a>
          <a href="/privacy" style={{color: '#333', textDecoration: 'none', fontSize: '12px'}}>Privacy Policy</a>
          <a href="/refund" style={{color: '#333', textDecoration: 'none', fontSize: '12px'}}>Refund Policy</a>
        </div>
        <div style={{color: '#222', fontSize: '11px', letterSpacing: '2px'}}>© 2026 SMURFRANK MARKETPLACE. ALL RIGHTS RESERVED.</div>
      </footer>
    </main>
  );
}