'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', paddingBottom: '100px', color: '#fff' }}>
      {/* 🚀 SEO SUITE */}
      <title>SmurfRank | #1 Marketplace for CS2, Valorant & GTA V Accounts</title>
      <meta name="description" content="Buy premium ranked accounts with instant delivery. Professional boosting and verified seller marketplace." />
      
      {/* 🪄 HERO */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', padding: '100px 20px 80px' }}>
        <h1 style={{ fontSize: 'clamp(50px, 10vw, 100px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-5px', margin: 0, lineHeight: 0.9 }}>
          LEVEL UP <br/> <span style={{ color: '#66FCF1' }}>SMURF RANK</span>
        </h1>
      </motion.section>

      {/* ⚡ HOT DEALS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px' }}>HOT <span style={{ color: '#66FCF1' }}>DEALS</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { id: 'h1', title: 'CS2 GLOBAL ELITE', price: '$45.00', desc: 'Prime • Instant' },
            { id: 'h2', title: 'VALORANT RADIANT', price: '$125.00', desc: 'Skins • Peak Rank' },
            { id: 'h3', title: 'GTA V MODDED 2BN', price: '$29.00', desc: 'Level 500 • Unlocks' }
          ].map((acc) => (
            <motion.div
              key={acc.id}
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, boxShadow: '0px 0px 30px rgba(102, 252, 241, 0.4)' }}
              style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #222', perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <h3 style={{ fontWeight: 900, marginBottom: '8px' }}>{acc.title}</h3>
              <p style={{ color: '#444', fontSize: '12px', marginBottom: '25px' }}>{acc.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: '20px' }}>{acc.price}</span>
                <button onClick={() => addToCart(acc)} style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 18px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer' }}>ADD TO CART</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🟣 BOOSTING SECTION (RESTORED) */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(45deg, #1a0b2e, #0a0a0b)', border: '1px solid #3d007a', borderRadius: '24px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '20px' }}>NEED A <span style={{ color: '#9D00FF' }}>RANK BOOST?</span></h2>
            <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '18px' }}>Radiant & Global Elite boosters ready. 100% Win Rate Guaranteed.</p>
            <button
              onClick={() => window.location.href = '/boosting'} 
              style={{ background: '#9D00FF', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer' }}>START BOOST →</button>
          </div>
        </div>
      </section>

      {/* 👑 GOLD SELLER SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #1a1608 0%, #0a0a0b 100%)', 
          border: '1px solid #D4AF37', 
          borderRadius: '24px', 
          padding: '60px', 
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.1)'
        }}>
          <h2 style={{ fontWeight: 900, fontSize: '35px', marginBottom: '15px', color: '#D4AF37' }}>BECOME A <span style={{ color: '#fff' }}>VERIFIED SELLER</span></h2>
          <p style={{ color: '#888', marginBottom: '35px', maxWidth: '600px', margin: '0 auto 35px' }}>
            Cash out your high-rank accounts. We offer the lowest fees and fastest payouts in the industry.
          </p>
          <button 
            onClick={() => window.location.href = '/sell'}
            style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '18px 50px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}
          >
            START SELLING NOW
          </button>
        </div>
      </section>
    </main>
  );
}