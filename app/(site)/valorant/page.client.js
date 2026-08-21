'use client';
import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import SortFilter from '../../../components/SortFilter';
import { useProductSort } from '../../../hooks/useProductSort';
import { listingToProduct } from '../../../lib/listingToProduct';

export default function ValorantPage({ listings }) {
  const { addToCart } = useCart();
  const [activeSort, setActiveSort] = useState('TOP_RATED');

  const products = listings.map(listingToProduct);
  const sortedProducts = useProductSort(products, activeSort);

  return (
    <main style={{ background: 'linear-gradient(rgba(10, 10, 11, 0.85), rgba(10, 10, 11, 0.95)), url("https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', minHeight: '100vh', padding: '80px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>VALORANT <span style={{ color: '#FF4655' }}>ACCOUNTS</span></h1>
        <p style={{ color: '#444', marginBottom: '30px', fontWeight: 700 }}>CERTIFIED RADIANT SELLERS • 100% SECURE DELIVERY</p>

        <SortFilter activeSort={activeSort} onSort={setActiveSort} themeColor="#FF4655" />

        {sortedProducts.length === 0 ? (
          <p style={{ color: '#888', padding: '60px 0', textAlign: 'center' }}>No Valorant accounts available right now. Check back soon.</p>
        ) : (
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
        )}
      </div>
    </main>
  );
}
