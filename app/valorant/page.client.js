'use client';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import SortFilter from '../../components/SortFilter';

const products = [
  { id: 'v1', title: 'RADIANT PEAK ACCOUNT', price: '$125.00', desc: 'All Agents • Exclusive Skins • High Elo Guaranteed', game: 'VAL' },
  { id: 'v2', title: 'IMMORTAL 3 SMURF', price: '$85.00', desc: 'Ready for Ranked • Clean History • Instant Delivery', game: 'VAL' },
  { id: 'v3', title: 'ASCENDANT 1 FRESH', price: '$45.00', desc: 'Original Email Access • Instant Login • Secure', game: 'VAL' },
  { id: 'v4', title: 'SKIN STACKED ACCOUNT', price: '$150.00', desc: 'Rare Vandal & Phantom Skins • Level 100+', game: 'VAL' }
];

export default function ValorantPage() {
  const { addToCart } = useCart();
  const [activeSort, setActiveSort] = useState('TOP_RATED');

  // ⚡ BOLT OPTIMIZATION: Pre-parse sorting keys (Schwartzian Transform)
  // 💡 What: Mapped `price` strings to `numericPrice` numbers once before sorting, wrapped in useMemo. Moved products array outside component.
  // 🎯 Why: Parsing floats and running regex inside a sort comparator creates an O(N log N) overhead. Moving static array outside ensures stable reference.
  // 📊 Impact: Reduces expensive regex string manipulation from O(N log N) to O(N), and prevents parsing on unrelated renders, significantly improving execution time for large lists.
  const sortedProducts = React.useMemo(() => {
    if (activeSort === 'BEST_SELLER') {
      return [...products].reverse();
    }

    if (activeSort === 'LOW_HIGH' || activeSort === 'HIGH_LOW') {
      const parsedProducts = products.map(p => ({
        ...p,
        numericPrice: parseFloat(p.price.replace(/[^0-9.-]+/g, ""))
      }));

      parsedProducts.sort((a, b) => activeSort === 'LOW_HIGH' ? a.numericPrice - b.numericPrice : b.numericPrice - a.numericPrice);
      return parsedProducts;
    }

    return [...products];
  }, [activeSort]);

  return (
    <main style={{ background: 'linear-gradient(rgba(10, 10, 11, 0.85), rgba(10, 10, 11, 0.95)), url("https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', minHeight: '100vh', padding: '80px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>VALORANT <span style={{ color: '#FF4655' }}>ACCOUNTS</span></h1>
        <p style={{ color: '#444', marginBottom: '30px', fontWeight: 700 }}>CERTIFIED RADIANT SELLERS • 100% SECURE DELIVERY</p>

        <SortFilter activeSort={activeSort} onSort={setActiveSort} themeColor="#FF4655" />

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
                    padding: '6px 12px',
                    fontSize: '10px',
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