'use client';
import React from 'react';
import { useCart } from '../../../context/CartContext';

export default function BoostingPageClient({ services }) {
  const { addToCart } = useCart();

  const boostingServices = services.map((s) => ({
    id: s.id,
    title: s.title,
    price: `$${s.price.toFixed(2)}`,
    desc: s.description,
    game: s.game,
  }));

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', padding: '100px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '10px', letterSpacing: '-2px' }}>
          PRO <span style={{ color: '#9D00FF' }}>BOOSTING</span>
        </h1>
        <p style={{ color: '#555', marginBottom: '50px', fontWeight: 600 }}>SECURE • ANONYMOUS • FAST DELIVERY</p>

        {boostingServices.length === 0 ? (
          <p style={{ color: '#888', padding: '60px 0', textAlign: 'center' }}>No boosting services available right now. Check back soon.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {boostingServices.map((service) => (
              <div key={service.id} style={{ background: '#111', padding: '40px 30px', borderRadius: '24px', border: '1px solid #222', transition: '0.3s' }}>
                <div style={{ color: '#9D00FF', fontWeight: 900, fontSize: '12px', marginBottom: '15px', textTransform: 'uppercase' }}>Available Now</div>
                <h3 style={{ fontWeight: 900, fontSize: '20px', marginBottom: '10px' }}>{service.title}</h3>
                <p style={{ color: '#444', fontSize: '14px', marginBottom: '30px', fontWeight: 600, lineHeight: '1.5' }}>{service.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
                  <span style={{ fontWeight: 900, fontSize: '24px', color: '#fff' }}>{service.price}</span>
                  <button
                    onClick={() => addToCart(service)}
                    style={{ background: '#9D00FF', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '6px', fontWeight: 900, cursor: 'pointer', fontSize: '11px' }}
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
