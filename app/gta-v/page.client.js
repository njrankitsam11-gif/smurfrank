'use client';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import SortFilter from '../../components/SortFilter';

const products = [
  { id: 'g1', title: 'GTA V 2 BILLION CASH', price: '$29.00', desc: 'Level 500 • All Heist Unlocks • PC/Console', game: 'GTA' },
  { id: 'g2', title: 'MODDED CARS GARAGE', price: '$35.00', desc: '60+ Modded Vehicles • Rare Liveries', game: 'GTA' },
  { id: 'g3', title: 'FRESH MODDED START', price: '$15.00', desc: '$500M Cash • Level 120 • All Outfits', game: 'GTA' },
  { id: 'g4', title: 'THE KINGPIN BUNDLE', price: '$55.00', desc: '$5B Cash • Level 8000 • Max Stats', game: 'GTA' }
];

// ⚡ BOLT OPTIMIZATION: Pre-calculate sorting keys and extract static arrays
// 💡 What: Moved the static array outside the component and pre-parsed the price into numericPrice.
// 🎯 Why: Prevents recreating the array on every render and changes the sort comparator from O(expensive * N log N) to O(1) comparison, reducing CPU overhead during sorting.
// 📊 Impact: O(1) sort comparator complexity. Eliminates unnecessary array allocations per render.
const parsedProducts = products.map(p => ({
  ...p,
  numericPrice: parseFloat(p.price.replace(/[^0-9.-]+/g, ""))
}));

export default function GTAVPageClient() {
  const { addToCart } = useCart();
  const [activeSort, setActiveSort] = useState('TOP_RATED');

  let sortedProducts = [...parsedProducts];
  if (activeSort === 'LOW_HIGH') {
    sortedProducts.sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (activeSort === 'HIGH_LOW') {
    sortedProducts.sort((a, b) => b.numericPrice - a.numericPrice);
  } else if (activeSort === 'BEST_SELLER') {
    sortedProducts.reverse();
  }

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', padding: '80px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>GTA V <span style={{ color: '#66FCF1' }}>MODDED</span></h1>
        <p style={{ color: '#444', marginBottom: '30px', fontWeight: 700 }}>INSTANT MONEY DROPS • SAFE & UNDETECTED</p>

        <SortFilter activeSort={activeSort} onSort={setActiveSort} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {sortedProducts.map((p) => (
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
