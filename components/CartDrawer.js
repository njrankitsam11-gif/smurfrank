'use client';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, total, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      {/* Dark Overlay */}
      <div onClick={() => setIsOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }} />
      
      {/* Sidebar */}
      <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '380px', background: '#0a0a0b', borderLeft: '1px solid #222', padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontWeight: 900, margin: 0 }}>YOUR <span style={{ color: '#66FCF1' }}>CART</span></h2>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #111' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800 }}>{item.title}</div>
                <button onClick={() => removeFromCart(i)} style={{ background: 'none', border: 'none', color: '#ff4444', fontSize: '10px', cursor: 'pointer', padding: 0 }}>REMOVE</button>
              </div>
              <div style={{ fontWeight: 900, color: '#66FCF1' }}>{item.price}</div>
            </div>
          ))}
        </div>

        {/* THE MAGNET OFFER */}
        {cart.length > 0 && (
          <div style={{ background: 'rgba(102, 252, 241, 0.05)', border: '1px dashed #66FCF1', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ color: '#66FCF1', fontSize: '12px', fontWeight: 900 }}>LOYALTY REWARD UNLOCKED!</div>
            <div style={{ fontSize: '11px', color: '#aaa' }}>Purchase now to get <b style={{color: '#fff'}}>11% OFF</b> your next order instantly.</div>
          </div>
        )}

        <div style={{ borderTop: '1px solid #222', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '20px', fontWeight: 900 }}>
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button style={{ width: '100%', padding: '18px', background: '#66FCF1', color: '#000', fontWeight: 900, border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}