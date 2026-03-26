import { cache } from 'react';
import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';

// ⚡ BOLT OPTIMIZATION: Wrap Prisma call in React.cache()
// 💡 What: Deduplicate direct database queries across generateMetadata and the Server Component.
// 🎯 Why: Next.js does not automatically deduplicate direct database ORM calls during a request cycle.
// 📊 Impact: Eliminates 1 redundant database query per page load, improving TTFB and reducing DB load by 50%.
const getListing = cache(async (id) => {
  return await prisma.listing.findUnique({ where: { id } });
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return { title: 'Listing Not Found' };
  return {
    title: `${listing.title} | Buy ${listing.game} Accounts`,
    description: `Securely buy this ${listing.game} account. Rank: ${listing.rank}, Region: ${listing.region}. Instant delivery and escrow protection guaranteed.`,
  };
}

import Link from 'next/link';

export default async function ListingDetailPage({ params }) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) notFound();

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white'}}>
      
      {/* 
        NOTE: The old <nav> is permanently removed from here! 
        Your Master Nav handles everything automatically now. 
      */}

      {/* Main Content Grid */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px'}}>
        
        {/* LEFT COLUMN: Details */}
        <div>
          <Link href="/" style={{color: '#FF6A00', textDecoration: 'none', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px'}}>← Back to Marketplace</Link>
          
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

          {/* 🪄 FUN & PREMIUM DESCRIPTION SECTION */}
          <div style={{ 
            marginTop: '20px', 
            background: 'linear-gradient(135deg, #0f0f17 0%, #050507 100%)', 
            padding: '40px', 
            borderRadius: '16px', 
            border: '1px solid #1a1a1a',
            borderLeft: '4px solid #FF6A00', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            
            {/* Faded background icon for that gaming vibe */}
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '150px', opacity: '0.02', pointerEvents: 'none' }}>
              🎮
            </div>

            <h2 style={{ 
              fontSize: '22px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              marginBottom: '20px', 
              letterSpacing: '2px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px' 
            }}>
              <span style={{ color: '#FF6A00' }}>✦</span> Account Dossier
            </h2>

            <p style={{ 
              fontSize: '16px', 
              color: '#b3b3b3', 
              lineHeight: '1.8', 
              marginBottom: '32px',
              fontFamily: 'monospace' 
            }}>
              {listing.description || `This is a verified ${listing.game} account. It features a ${listing.rank} rank and is located in the ${listing.region} region. Upon purchase, you will receive full access credentials including the original email.`}
            </p>

            {/* Premium "Loot Drop" Tags */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255, 106, 0, 0.1)', color: '#FF6A00', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(255,106,0,0.2)' }}>
                ✅ Anti-Ban Secure
              </span>
              <span style={{ background: 'rgba(0, 255, 102, 0.1)', color: '#00FF66', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(0,255,102,0.2)' }}>
                🔒 Full OGE Access
              </span>
              <span style={{ background: 'rgba(157, 0, 255, 0.1)', color: '#9D00FF', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(157,0,255,0.2)' }}>
                ⚡ Matchmaking Ready
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <div style={{position: 'relative'}}>
          <div style={{position: 'sticky', top: '100px', backgroundColor: '#0f0f17', border: '1px solid #1a1a1a', padding: '32px'}}>
            <div style={{color: '#555', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px'}}>Buy Now For</div>
            <div style={{fontSize: '48px', fontWeight: 900, color: '#FF6A00', marginBottom: '32px'}}>
              ${Number(listing.price).toFixed(2)}
            </div>
            
            <button style={{width: '100%', background: 'linear-gradient(45deg, #FF6A00, #e65c00)', color: '#000', padding: '20px', fontWeight: 900, fontSize: '16px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s ease', boxShadow: '0 5px 15px rgba(255,106,0,0.2)'}}>
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