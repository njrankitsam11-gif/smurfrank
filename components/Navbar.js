'use client';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { cart, setIsOpen } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#050505' }}>
      {/* MOVING LIVE FEED */}
      <div style={{ background: '#66FCF1', color: '#000', padding: '8px 0', fontSize: '10px', fontWeight: 900, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="live-feed-animation">
          {mounted ? (
            <>
              LIVE: USER_{Math.floor(Math.random()*999)} PURCHASED GTA V 2BN ACCOUNT — 1m AGO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              LIVE: USER_{Math.floor(Math.random()*999)} PURCHASED CS2 GLOBAL ELITE — 3m AGO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              LIVE: USER_{Math.floor(Math.random()*999)} PURCHASED VALORANT RADIANT — 5m AGO
            </>
          ) : (
            "LOADING RECENT SALES..."
          )}
        </div>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5vw', height: '80px', borderBottom: '1px solid #111' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textDecoration: 'none' }}>SMURF<span style={{ color: '#66FCF1' }}>RANK</span></a>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/cs2" style={{ color: '#888', textDecoration: 'none', fontSize: '11px', fontWeight: 800 }}>CS2</a>
          <a href="/valorant" style={{ color: '#888', textDecoration: 'none', fontSize: '11px', fontWeight: 800 }}>VAL</a>
          <a href="/gta-v" style={{ color: '#888', textDecoration: 'none', fontSize: '11px', fontWeight: 800 }}>GTA V</a>
          <a href="/boosting" style={{ color: '#9D00FF', textDecoration: 'none', fontSize: '11px', fontWeight: 800 }}>BOOSTING</a>
          <a href="/sell" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '11px', fontWeight: 800 }}>SELL</a>
          
          <div style={{ width: '1px', height: '20px', background: '#222', margin: '0 10px' }} />
          
          <a href="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '11px', fontWeight: 800 }}>SIGN IN</a>
          
          <button onClick={() => setIsOpen(true)} style={{ background: 'rgba(102, 252, 241, 0.1)', border: '1px solid #66FCF1', color: '#66FCF1', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 900, fontSize: '11px' }}>
            CART ({cart.length})
          </button>
        </div>
      </nav>
    </header>
  );
}