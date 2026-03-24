'use client';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, total, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      {/* Black Backdrop */}
      <div onClick={() => setIsOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)' }} />
      
      {/* Drawer Body */}
      <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '400px', background: '#0a0a0b', borderLeft: '1px solid #222', padding: '40px 30px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 style={{ fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>YOUR <span style={{ color: '#66FCF1' }}>CART</span></h2>
          <button aria-label="Close cart" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '24px' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? <p style={{ color: '#444', textAlign: 'center', marginTop: '50px' }}>Empty.</p> : 
            cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #111' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '14px' }}>{item.title}</p>
                  <button aria-label="Remove item" onClick={() => removeFromCart(i)} style={{ background: 'none', border: 'none', color: '#ff4444', fontSize: '10px', cursor: 'pointer', padding: 0 }}>REMOVE</button>
                </div>
                <p style={{ margin: 0, fontWeight: 900, color: '#66FCF1' }}>{item.price}</p>
              </div>
            ))
          }
        </div>

        {/* 🎁 THE 11% MAGNET HOOK */}
        {cart.length > 0 && (
          <div style={{ background: 'rgba(102, 252, 241, 0.05)', border: '1px dashed #66FCF1', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <p style={{ color: '#66FCF1', fontWeight: 900, margin: '0 0 5px 0', fontSize: '12px' }}>🔥 LOYALTY REWARD ACTIVATED</p>
            <p style={{ color: '#aaa', margin: 0, fontSize: '11px', lineHeight: '1.4' }}>Purchase this order and receive an <b>11% OFF coupon</b> for your next buy instantly via email.</p>
          </div>
        )}

        <div style={{ borderTop: '1px solid #222', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ fontWeight: 800, color: '#444' }}>SUBTOTAL</span>
            <span style={{ fontWeight: 900, fontSize: '22px' }}>${total.toFixed(2)}</span>
          </div>
          <button style={{ width: '100%', padding: '20px', background: '#fff', color: '#000', fontWeight: 900, borderRadius: '4px', border: 'none', cursor: 'pointer' }}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}