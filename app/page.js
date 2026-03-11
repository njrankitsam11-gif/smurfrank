'use client';
import React from 'react';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "SmurfRank",
    "url": "https://smurfrank.vercel.app",
    "description": "Premium Marketplace for CS2, Valorant, and GTA V Ranked Accounts.",
    "address": { "@type": "PostalAddress", "addressCountry": "UAE" }
  };

  return (
    <main>
      {/* 🚀 TOP-NOTCH SEO SUITE */}
      <title>SmurfRank | #1 Marketplace for CS2, Valorant & GTA V Accounts</title>
      <meta name="description" content="Buy premium ranked accounts with instant delivery. Professional boosting for CS2 & Valorant. Secure, verified, and elite quality gaming marketplace." />
      <meta name="keywords" content="buy cs2 prime, valorant radiant accounts, gta v modded accounts, rank boost, smurfrank" />
      <meta property="og:title" content="SmurfRank | Premium Gaming Marketplace" />
      <meta property="og:description" content="Instant delivery on high-tier ranked accounts." />
      <meta property="og:type" content="website" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 🪄 HERO */}
      <section style={{ textAlign: 'center', padding: '120px 20px 60px' }}>
        <h1 style={{ fontSize: 'clamp(50px, 10vw, 100px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-5px', margin: 0, lineHeight: 0.9 }}>
          LEVEL UP <br/> <span style={{ color: '#66FCF1', textShadow: '0 0 40px rgba(102,252,241,0.3)' }}>SMURF RANK</span>
        </h1>
        <p style={{ color: '#555', fontSize: '20px', marginTop: '20px', fontWeight: 500 }}>The elite choice for ranked dominance and instant delivery.</p>
      </section>

      {/* 🎮 CATEGORIES */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '0 20px' }}>
        {['CS2 ACCOUNTS', 'VALORANT', 'GTA V MODDED', 'RANK BOOSTING'].map((item) => (
          <div key={item} style={{ background: '#0a0a0a', border: '1px solid #111', padding: '40px 20px', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '1px', color: '#fff' }}>{item}</h3>
            <p style={{ color: '#66FCF1', fontSize: '10px', fontWeight: 900, marginTop: '12px', cursor: 'pointer' }}>EXPLORE →</p>
          </div>
        ))}
      </section>

      {/* ⚡ FEATURED GRID */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px', letterSpacing: '-1px' }}>HOT <span style={{ color: '#66FCF1' }}>ACCOUNTS</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { id: 1, title: 'CS2 GLOBAL ELITE', price: '$45.00', desc: 'Prime • 10yr Coin' },
            { id: 2, title: 'VALORANT RADIANT', price: '$125.00', desc: 'Peak Rank • Rare Skins' },
            { id: 3, title: 'GTA V 2 BILLION', price: '$29.00', desc: 'Level 500 • All Unlocks' }
          ].map((acc) => (
            <div key={acc.id} style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #222' }}>
              <h3 style={{ fontWeight: 900, marginBottom: '8px', fontSize: '16px' }}>{acc.title}</h3>
              <p style={{ color: '#444', fontSize: '12px', marginBottom: '25px', fontWeight: 600 }}>{acc.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: '20px' }}>{acc.price}</span>
                <button onClick={() => addToCart(acc)} style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 18px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer', fontSize: '11px' }}>ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}