'use client';
import React from 'react';

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SmurfRank",
    "url": "https://smurfrank.vercel.app",
    "description": "Premium Marketplace for Ranked Accounts and Professional Boosting Services."
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0b', color: '#fff', paddingBottom: '100px', fontFamily: 'sans-serif' }}>
      
      {/* ✅ SEO TAGS */}
      <title>SmurfRank | Premium Ranked Accounts & Professional Boosting</title>
      <meta name="description" content="The #1 marketplace for CS2, Valorant, and GTA V accounts. Instant delivery and verified sellers." />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 🪄 HERO SECTION */}
      <section style={{ textAlign: 'center', padding: '120px 20px 80px' }}>
        <h1 style={{ fontSize: 'clamp(50px, 9vw, 95px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-4px', marginBottom: '30px' }}>
          LEVEL UP <br/>
          <span style={{ color: '#66FCF1', textShadow: '0 0 50px rgba(102, 252, 241, 0.5)' }}>SMURF RANK</span>
        </h1>
        <p style={{ color: '#888', fontSize: '20px', maxWidth: '650px', margin: '0 auto 40px' }}>
          The elite choice for high-tier accounts and professional rank boosting.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="/cs2" style={{ background: '#66FCF1', color: '#000', padding: '18px 40px', borderRadius: '4px', fontWeight: 900, textDecoration: 'none', boxShadow: '0 10px 30px rgba(102, 252, 241, 0.3)' }}>BROWSE ACCOUNTS</a>
          <a href="/boosting" style={{ background: 'transparent', color: '#fff', padding: '18px 40px', borderRadius: '4px', fontWeight: 900, textDecoration: 'none', border: '1px solid #333' }}>EXPLORE BOOSTING</a>
        </div>
      </section>

      {/* ⚡ FEATURED LISTINGS GRID */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>HOT <span style={{ color: '#66FCF1' }}>ACCOUNTS</span></h2>
            <p style={{ color: '#444', fontSize: '13px', fontWeight: 700 }}>INSTANT DELIVERY • VERIFIED ONLY</p>
          </div>
          <a href="/cs2" style={{ color: '#66FCF1', fontSize: '12px', fontWeight: 900, textDecoration: 'none', borderBottom: '1px solid #66FCF1' }}>VIEW ALL →</a>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px' 
        }}>
          {/* PRODUCT CARDS */}
          {[
            { game: 'CS2', title: 'GLOBAL ELITE PRIME', price: '$45.00', icon: '⭐', desc: 'Full Access • 15 Year Coin' },
            { game: 'VAL', title: 'RADIANT PEAK ACCOUNT', price: '$120.00', icon: '🎭', desc: 'All Agents • Rare Skins' },
            { game: 'GTA', title: 'GTA V MODDED 2BN', price: '$25.00', icon: '💰', desc: 'Level 500 • All Unlocks' }
          ].map((item, idx) => (
            <div key={idx} style={cardStyle} onMouseOver={(e) => e.currentTarget.style.borderColor = '#66FCF1'} onMouseOut={(e) => e.currentTarget.style.borderColor = '#222'}>
              <div style={badgeStyle}>{item.game}</div>
              <div style={imageContainerStyle}>{item.icon}</div>
              <h3 style={cardTitleStyle}>{item.title}</h3>
              <p style={cardDescStyle}>{item.desc}</p>
              <div style={priceRowStyle}>
                <span style={priceStyle}>{item.price}</span>
                <button style={cartButtonStyle} onClick={() => document.getElementById('cart-drawer').style.right = '0'}>ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🟣 BOOSTING SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(45deg, #16161a, #0a0a0b)', border: '1px solid #222', borderRadius: '20px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '20px' }}>NEED A <span style={{ color: '#9D00FF' }}>RANK BOOST?</span></h2>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>Hire our Radiant-tier professionals to secure your wins.</p>
            <a href="/boosting" style={{ color: '#9D00FF', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid #9D00FF' }}>GET BOOSTED NOW →</a>
          </div>
        </div>
      </section>

      {/* 🟠 SELLER SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900 }}>EARN WITH <span style={{ color: '#FF6A00' }}>US</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
           <div style={{ background: '#111', padding: '40px', borderRadius: '15px', border: '1px solid #222' }}>
              <h3 style={{ color: '#FF6A00', fontWeight: 900, marginBottom: '15px' }}>ZERO FEES</h3>
              <p style={{ color: '#777', fontSize: '14px' }}>Market-leading rates with no hidden costs for sellers.</p>
           </div>
           <div style={{ background: '#111', padding: '40px', borderRadius: '15px', border: '1px solid #222' }}>
              <h3 style={{ color: '#FF6A00', fontWeight: 900, marginBottom: '15px' }}>GLOBAL REACH</h3>
              <p style={{ color: '#777', fontSize: '14px' }}>Connect with buyers from UAE, NA, and EU instantly.</p>
           </div>
        </div>
      </section>
    </main>
  );
}

// STYLES DEFINED INSIDE THE FILE TO PREVENT REFERENCE ERRORS
const cardStyle = { background: 'rgba(255, 255, 255, 0.02)', border: '1px solid #222', borderRadius: '12px', padding: '24px', transition: '0.3s ease', position: 'relative' };
const badgeStyle = { position: 'absolute', top: '15px', right: '15px', background: '#111', color: '#66FCF1', fontSize: '9px', fontWeight: 900, padding: '4px 8px', borderRadius: '4px', border: '1px solid #66FCF1' };
const imageContainerStyle = { height: '140px', background: '#070707', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' };
const cardTitleStyle = { fontSize: '15px', fontWeight: 900, marginBottom: '5px', color: '#fff', textAlign: 'left' };
const cardDescStyle = { fontSize: '12px', color: '#555', marginBottom: '20px', fontWeight: 600, textAlign: 'left' };
const priceRowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const priceStyle = { fontSize: '18px', fontWeight: 900, color: '#fff' };
const cartButtonStyle = { background: '#fff', color: '#000', border: 'none', padding: '10px 15px', borderRadius: '4px', fontWeight: 900, fontSize: '10px', cursor: 'pointer' };