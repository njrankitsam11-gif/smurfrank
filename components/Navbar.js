'use client';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart, setIsOpen } = useCart();

  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5vw', height: '80px', borderBottom: '1px solid #111', background: '#050505', position: 'sticky', top: 0, zIndex: 1000 }}>
      <a href="/" style={{ fontSize: '22px', fontWeight: 900, color: '#fff', textDecoration: 'none' }}>SMURF<span style={{ color: '#66FCF1' }}>RANK</span></a>
      <button onClick={() => setIsOpen(true)} style={{ background: 'none', border: '1px solid #66FCF1', color: '#fff', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 800 }}>
        CART ({cart.length})
      </button>
    </nav>
  );
}