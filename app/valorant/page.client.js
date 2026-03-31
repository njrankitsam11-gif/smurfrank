'use client';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import SortFilter from '../../components/SortFilter';

export default function ValorantPage() {
  const { addToCart } = useCart();
  const [activeSort, setActiveSort] = useState('TOP_RATED');

  const products = [
    { id: 'v1', title: 'RADIANT PEAK ACCOUNT', price: '$125.00', desc: 'All Agents • Exclusive Skins • High Elo Guaranteed', game: 'VAL' },
    { id: 'v2', title: 'IMMORTAL 3 SMURF', price: '$85.00', desc: 'Ready for Ranked • Clean History • Instant Delivery', game: 'VAL' },
    { id: 'v3', title: 'ASCENDANT 1 FRESH', price: '$45.00', desc: 'Original Email Access • Instant Login • Secure', game: 'VAL' },
    { id: 'v4', title: 'SKIN STACKED ACCOUNT', price: '$150.00', desc: 'Rare Vandal & Phantom Skins • Level 100+', game: 'VAL' }
  ];

  let sortedProducts = [...products];
  if (activeSort === 'LOW_HIGH') {
    sortedProducts.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.price.replace(/[^0-9.-]+/g,"")));
  } else if (activeSort === 'HIGH_LOW') {
    sortedProducts.sort((a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g,"")) - parseFloat(a.price.replace(/[^0-9.-]+/g,"")));
  } else if (activeSort === 'BEST_SELLER') {
    sortedProducts.reverse();
  }

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', padding: '80px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>VALORANT <span style={{ color: '#FF4655' }}>ACCOUNTS</span></h1>
        <p style={{ color: '#444', marginBottom: '30px', fontWeight: 700 }}>CERTIFIED RADIANT SELLERS • 100% SECURE DELIVERY</p>

        <SortFilter activeSort={activeSort} onSort={setActiveSort} accentColor="#FF4655" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {sortedProducts.map((p) => (
            <div key={p.id} style={{
              background: '#111',
              padding: '30px 20px',
              borderRadius: '18px',
              border: '1px solid #222',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px'
            }}>
              <div>
                <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ color: '#555', fontSize: '13px', marginBottom: '20px', fontWeight: 600, lineHeight: '1.4' }}>{p.desc}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontWeight: 900, fontSize: '20px', color: '#fff' }}>{p.price}</span>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '5px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    fontSize: '11px',
                    whiteSpace: 'nowrap'
                  }}
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