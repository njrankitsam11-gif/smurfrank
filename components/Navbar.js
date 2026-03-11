'use client';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart, setIsOpen } = useCart();

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* 🔴 LIVE SALES FEED */}
      <div style={{ background: '#66FCF1', color: '#000', padding: '8px 0', fontSize: '10px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
        LIVE SALES FEED: USER_{Math.floor(Math.random()*9999)} PURCHASED CS2 GLOBAL ELITE ACCOUNT ($45.00) — 2 MINS AGO
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5vw', height: '75px', background: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(15px)', borderBottom: '1px solid #111' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textDecoration: 'none', letterSpacing: '-1px' }}>
          SMURF<span style={{ color: '#66FCF1' }}>RANK</span>
        </a>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <a href="/cs2" style={{ color: '#888', textDecoration: 'none', fontSize: '12px', fontWeight: 800 }}>CS2</a>
          <a href="/valorant" style={{ color: '#888', textDecoration: 'none', fontSize: '12px', fontWeight: 800 }}>VAL</a>
          <a href="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px', fontWeight: 800 }}>SIGN IN</a>
          
          <button onClick={() => setIsOpen(true)} style={{ background: 'rgba(102, 252, 241, 0.1)', border: '1px solid #66FCF1', color: '#66FCF1', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 900, fontSize: '11px' }}>
            CART ({cart.length})
          </button>
        </div>
      </nav>
    </header>
  );
}