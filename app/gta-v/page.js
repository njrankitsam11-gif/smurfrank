'use client';
import React from 'react';
import { useCart } from '../../context/CartContext';

export default function GTAVPage() {
  const { addToCart } = useCart();

  const products = [
    { id: 'g1', title: 'GTA V 2 BILLION CASH', price: '$29.00', desc: 'Level 500 • All Heist Unlocks • PC/Console', game: 'GTA' },
    { id: 'g2', title: 'MODDED CARS GARAGE', price: '$35.00', desc: '60+ Modded Vehicles • Rare Liveries', game: 'GTA' },
    { id: 'g3', title: 'FRESH MODDED START', price: '$15.00', desc: '$500M Cash • Level 120 • All Outfits', game: 'GTA' },
    { id: 'g4', title: 'THE KINGPIN BUNDLE', price: '$55.00', desc: '$5B Cash • Level 8000 • Max Stats', game: 'GTA' }
  ];

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', padding: '80px 20px', color: '#fff' }}>
      {/* 🚀 GTA V SEO */}
      <title>Buy GTA V Modded Accounts | $2B Cash & Level 500 | SmurfRank</title>
      <meta name="description" content="Premium GTA V Modded accounts for PC and Console. Instant delivery on billions in cash, high levels, and rare modded outfits." />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>GTA V <span style={{ color: '#66FCF1' }}>MODDED</span></h1>
        <p style={{ color: '#444', marginBottom: '50px', fontWeight: 700 }}>INSTANT MONEY DROPS • SAFE & UNDETECTED</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {products.map((p) => (
            <div key={p.id} style={{ background: '#111', padding: '35px', borderRadius: '18px', border: '1px solid #222' }}>
              <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '10px' }}>{p.title}</h3>
              <p style={{ color: '#555', fontSize: '13px', marginBottom: '25px', fontWeight: 600 }}>{p.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: '22px' }}>{p.price}</span>
                <button 
                  onClick={() => addToCart(p)}
                  style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer' }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}