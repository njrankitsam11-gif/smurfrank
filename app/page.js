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
    <main style={{ background: '#0a0a0b', minHeight: '100vh', paddingBottom: '100px', color: '#fff' }}>
      {/* 🚀 TOP-NOTCH SEO */}
      <title>SmurfRank | #1 Marketplace for CS2, Valorant & GTA V Accounts</title>
      <meta name="description" content="Buy premium ranked accounts with instant delivery. Professional boosting for CS2 & Valorant. Secure, verified, and elite quality gaming marketplace." />
      <meta name="keywords" content="buy cs2 prime, valorant radiant accounts, gta v modded accounts, rank boost, smurfrank, sell accounts" />
      <meta property="og:title" content="SmurfRank | Premium Gaming Marketplace" />
      <meta property="og:description" content="Instant delivery on high-tier ranked accounts. CS2, Val, GTA V." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 🪄 HERO */}
      <section style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
        <h1 style={{ fontSize: 'clamp(50px, 10vw, 100px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-5px', margin: 0, lineHeight: 0.9 }}>
          LEVEL UP <br/> <span style={{ color: '#66FCF1', textShadow: '0 0 40px rgba(102,252,241,0.3)' }}>SMURF RANK</span>
        </h1>
        <p style={{ color: '#555', fontSize: '20px', marginTop: '20px', fontWeight: 500 }}>The elite choice for ranked dominance and instant delivery.</p>
        <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button style={{ background: '#66FCF1', color: '#000', border: 'none', padding: '15px 35px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer' }}>BROWSE SHOP</button>
          <button style={{ background: 'transparent', color: '#fff', border: '1px solid #222', padding: '15px 35px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer' }}>SELL ACCOUNT</button>
        </div>
      </section>

      {/* 🎮 CATEGORIES GRID */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '0 20px' }}>
        {[
          { name: 'CS2 PRIME', link: '/cs2' },
          { name: 'VALORANT', link: '/valorant' },
          { name: 'GTA V MODDED', link: '/gta-v' },
          { name: 'RANK BOOSTING', link: '/boosting' }
        ].map((item) => (
          <a key={item.name} href={item.link} style={{ background: '#111', border: '1px solid #222', padding: '30px 10px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '1px', color: '#fff', margin: 0 }}>{item.name}</h3>
          </a>
        ))}
      </section>

      {/* ⚡ HOT ACCOUNTS (GTA V INCLUDED) */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px' }}>HOT <span style={{ color: '#66FCF1' }}>ACCOUNTS</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { id: 1, title: 'CS2 GLOBAL ELITE', price: '$45.00', desc: 'Prime • 10yr Coin • Instant' },
            { id: 2, title: 'VALORANT RADIANT', price: '$125.00', desc: 'Skins • Peak Rank • All Agents' },
            { id: 3, title: 'GTA V MODDED 2BN', price: '$29.00', desc: 'Level 500 • All Unlocks • PC/Console' }
          ].map((acc) => (
            <div key={acc.id} style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #222' }}>
              <h3 style={{ fontWeight: 900, marginBottom: '8px', fontSize: '16px' }}>{acc.title}</h3>
              <p style={{ color: '#444', fontSize: '12px', marginBottom: '25px', fontWeight: 600 }}>{acc.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: '20px' }}>{acc.price}</span>
                <button onClick={() => addToCart(acc)} style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 18px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer' }}>ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🟣 BOOSTING SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(45deg, #1a0b2e, #0a0a0b)', border: '1px solid #3d007a', borderRadius: '24px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '20px' }}>NEED A <span style={{ color: '#9D00FF' }}>RANK BOOST?</span></h2>
            <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '18px' }}>Radiant & Global Elite boosters ready. 100% Win Rate Guaranteed.</p>
            <button style={{ background: '#9D00FF', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer' }}>START BOOST →</button>
          </div>
        </div>
      </section>

      {/* 🤝 SELLER SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 900, fontSize: '30px', marginBottom: '20px' }}>WANT TO <span style={{ color: '#66FCF1' }}>SELL?</span></h2>
        <p style={{ color: '#555', marginBottom: '30px' }}>Join our verified sellers. Best rates, instant payouts.</p>
        <button style={{ background: 'transparent', color: '#66FCF1', border: '2px solid #66FCF1', padding: '15px 40px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer' }}>START SELLING</button>
      </section>
    </main>
  );
}