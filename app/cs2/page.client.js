'use client';
import React from 'react';
import { useCart } from '../../context/CartContext';

export default function CS2Page() {
  const { addToCart } = useCart();

  // SEO: Dynamic Title for CS2 category
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "CS2 Prime Accounts Marketplace",
    "description": "Buy high-tier CS2 Prime accounts, Global Elite, and Service Medal accounts."
  };

  const cs2Products = [
    { id: 'cs1', title: 'GLOBAL ELITE PRIME', price: '$45.00', desc: '10 Year Coin • Full Access', game: 'CS2' },
    { id: 'cs2', title: 'SUPREME MASTER FIRST CLASS', price: '$35.00', desc: 'Prime Enabled • High Trust', game: 'CS2' },
    { id: 'cs3', title: 'FACEIT LEVEL 10 READY', price: '$65.00', desc: 'Low Matches • High Elo', game: 'CS2' },
    { id: 'cs4', title: '2024 SERVICE MEDAL', price: '$25.00', desc: 'Prime • Instant Delivery', game: 'CS2' },
  ];

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', padding: '60px 20px', color: '#fff' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>CS2 <span style={{ color: '#66FCF1' }}>ACCOUNTS</span></h1>
        <p style={{ color: '#555', marginBottom: '50px', fontWeight: 600 }}>FILTER: PRIME ENABLED • INSTANT ACCESS</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {cs2Products.map((product) => (
            <div key={product.id} style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #222' }}>
              <div style={{ fontSize: '10px', color: '#66FCF1', fontWeight: 900, marginBottom: '10px' }}>PREMIUM LISTING</div>
              <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '8px' }}>{product.title}</h3>
              <p style={{ color: '#444', fontSize: '13px', marginBottom: '25px', fontWeight: 600 }}>{product.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: '22px' }}>{product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer', fontSize: '11px' }}
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