import React from 'react';

export const metadata = {
  title: 'Professional Game Boosting | CS2, Valorant & GTA V',
  description: 'Hire Radiant and Global Elite players to boost your rank. Safe, secure, and private game boosting services with 24/7 support.',
  keywords: 'valorant rank boosting, cs2 premier boost, gta v level boost, game carries, radiant booster',
};

export default function BoostingPage() {
  const services = [
    { 
      game: 'Valorant', 
      title: 'Rank Boosting', 
      price: 'Starting at $5.00', 
      color: '#FF4655', 
      features: ['Radiant Boosters', 'Duo Queue Available', 'VPN Protection'] 
    },
    { 
      game: 'CS2', 
      title: 'Premier Rating', 
      price: 'Starting at $4.50', 
      color: '#FFD700', 
      features: ['Global Elite Carry', 'High Trust Factor', 'Anti-Cheat Safe'] 
    },
    { 
      game: 'GTA V', 
      title: 'Money & Level', 
      price: 'Starting at $10.00', 
      color: '#00FF66', 
      features: ['Billionaire Packages', 'Max Rank 8000', 'Fast Delivery'] 
    }
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0b', color: '#fff', padding: '80px 20px', fontFamily: 'sans-serif' }}>
      
      {/* 1. Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px' }}>
          ELITE <span style={{ color: '#9D00FF', textShadow: '0 0 40px rgba(157,0,255,0.4)' }}>BOOSTING</span>
        </h1>
        <p style={{ color: '#888', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Stop the grind. Let the professionals handle the heavy lifting while you watch your rank soar.
        </p>
      </div>

      {/* 2. Boosting Service Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {services.map((s, i) => (
          <div key={i} style={{ 
            background: '#111', 
            border: '1px solid #222', 
            borderRadius: '16px', 
            padding: '40px', 
            position: 'relative',
            boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ color: s.color, fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
              {s.game} Service
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '20px' }}>{s.title}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {s.features.map((f, fi) => (
                <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#aaa' }}>
                  <span style={{ color: '#9D00FF' }}>✦</span> {f}
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>{s.price}</div>
              <button style={{ 
                background: '#9D00FF', 
                color: '#fff', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '6px', 
                fontWeight: 900, 
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(157,0,255,0.3)'
              }}>
                SELECT
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Safety/FAQ Section */}
      <div style={{ maxWidth: '800px', margin: '100px auto 0', textAlign: 'center' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>HOW IT WORKS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', color: '#666', fontSize: '14px' }}>
          <div>
            <div style={{ color: '#9D00FF', fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>01</div>
            Pick your goal
          </div>
          <div>
            <div style={{ color: '#9D00FF', fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>02</div>
            We assign a pro
          </div>
          <div>
            <div style={{ color: '#9D00FF', fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>03</div>
            Rank delivered
          </div>
        </div>
      </div>

    </main>
  );
}