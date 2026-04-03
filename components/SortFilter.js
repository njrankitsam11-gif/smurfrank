'use client';
import React from 'react';

export default function SortFilter({ activeSort, onSort, themeColor = '#5A9B90' }) {
  const options = [
    { id: 'TOP_RATED', label: 'Top Rated' },
    { id: 'LOW_HIGH', label: 'Low to High' },
    { id: 'HIGH_LOW', label: 'High to Low' },
    { id: 'BEST_SELLER', label: 'Best Seller' }
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSort(opt.id)}
          style={{
            background: activeSort === opt.id ? themeColor : '#FFFFFF',
            color: activeSort === opt.id ? '#FFFFFF' : '#43766D',
            border: activeSort === opt.id ? `1px solid ${themeColor}` : '1px solid #D1E8D1',
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textTransform: 'uppercase'
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
