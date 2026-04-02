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

export default function GTAVPageClient() {
  const { addToCart } = useCart();
  const [activeSort, setActiveSort] = useState('TOP_RATED');

  // ⚡ BOLT OPTIMIZATION: Pre-parse sorting keys (Schwartzian Transform)
  // 💡 What: Mapped `price` strings to `numericPrice` numbers once before sorting, wrapped in useMemo.
  // 🎯 Why: Parsing floats and running regex inside a sort comparator creates an O(N log N) overhead.
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

=======

      parsedProducts.sort((a, b) => activeSort === 'LOW_HIGH' ? a.numericPrice - b.numericPrice : b.numericPrice - a.numericPrice);
      return parsedProducts;
    }

>>>>>>> Stashed changes
    return [...products];
  }, [activeSort]);

  return (
    <main style={{
      background: 'linear-gradient(rgba(10, 10, 11, 0.85), rgba(10, 10, 11, 0.95)), url("https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/1280/V.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '80px 20px',
      color: '#fff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>GTA V <span style={{ color: '#54B72D' }}>MODDED</span></h1>
        <p style={{ color: '#444', marginBottom: '30px', fontWeight: 700 }}>INSTANT MONEY DROPS • SAFE & UNDETECTED</p>

        <SortFilter activeSort={activeSort} onSort={setActiveSort} themeColor="#54B72D" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {sortedProducts.map((p) => (
            <div key={p.id} style={{ background: '#111', padding: '35px', borderRadius: '18px', border: '1px solid #222' }}>
              <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '10px' }}>{p.title}</h3>
              <p style={{ color: '#555', fontSize: '13px', marginBottom: '25px', fontWeight: 600 }}>{p.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: '22px' }}>{p.price}</span>
                <button
                  onClick={() => addToCart(p)}
                  style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer', fontSize: '10px' }}
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
