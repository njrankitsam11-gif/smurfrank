import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return { title: 'Listing Not Found' };
  return {
    title: `${listing.title} | Buy ${listing.game} Accounts`,
    description: `Securely buy this ${listing.game} account. Rank: ${listing.rank}, Region: ${listing.region}. Instant delivery and escrow protection guaranteed.`,
  };
}

export default async function ListingDetailPage({ params }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id } });

  if (!listing) notFound();

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      {/* Navigation */}
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '64px', borderBottom: '1px solid #1a1a1a', backgroundColor: '#050507'}}>
        <a href="/" style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white'}}>
          SMURF<span style={{color: '#FF6A00'}}>RANK</span>
        </a>
      </nav>

      {/* Main Content Grid */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px'}}>
        
        {/* LEFT COLUMN: Details */}
        <div>
          <a href="/" style={{color: '#FF6A00', textDecoration: 'none', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px'}}>← Back to Marketplace</a>
          
          <h1 style={{fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', margin: '24px 0 32px', lineHeight: 1.1}}>
            {listing.title}
          </h1>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#1a1a1a', border: '1px solid #1a1a1a', marginBottom: '40px'}}>
            <div style={{backgroundColor: '#0f0f17', padding: '24px'}}>
              <div style={{color: '#555', fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, marginBottom: '8px'}}>Game</div>
              <div style={{fontSize: '18px', fontWeight: 700}}>{listing.game}</div>
            </div>
            <div style={{backgroundColor: '#0f0f17', padding: '24px'}}>
              <div style={{color: '#555', fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, marginBottom: '8px'}}>Rank Tier</div>
              <div style={{fontSize: '18px', fontWeight: 700}}>{listing.rank}</div>
            </div>
            <div style={{backgroundColor: '#0f0f17', padding: '24px'}}>
              <div style={{color: '#555', fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, marginBottom: '8px'}}>Region</div>
              <div style={{fontSize: '18px', fontWeight: 700}}>{listing.region}</div>
            </div>
            <div style={{backgroundColor: '#0f0f17', padding: '24px'}}>
              <div style={{color: '#555', fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, marginBottom: '8px'}}>Delivery</div>
              <div style={{fontSize: '18px', fontWeight: 700, color: '#FF6A00'}}>INSTANT</div>
            </div>
          </div>

          <h2 style={{fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', color: '#FF6A00'}}>Description</h2>
          <p style={{color: '#888', lineHeight: 1.8, fontSize: '16px'}}>
            {listing.description || `This is a verified ${listing.game} account. It features a ${listing.rank} rank and is located in the ${listing.region} region. Upon purchase, you will receive full access credentials including the original email.`}
          </p>
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <div style={{position: 'relative'}}>
          <div style={{position: 'sticky', top: '40px', backgroundColor: '#0f0f17', border: '1px solid #1a1a1a', padding: '32px'}}>
            <div style={{color: '#555', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px'}}>Buy Now For</div>
            <div style={{fontSize: '48px', fontWeight: 900, color: '#FF6A00', marginBottom: '32px'}}>
              ${Number(listing.price).toFixed(2)}
            </div>
            
            <button style={{width: '100%', background: '#FF6A00', color: '#000', padding: '20px', fontWeight: 900, fontSize: '16px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px'}}>
              Proceed to Purchase
            </button>
            
            <div style={{marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#888'}}>
                <span style={{color: '#FF6A00'}}>✔</span> Instant Delivery via Email
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#888'}}>
                <span style={{color: '#FF6A00'}}>✔</span> Secure Escrow Protection
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#888'}}>
                <span style={{color: '#FF6A00'}}>✔</span> Verified Seller Account
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}