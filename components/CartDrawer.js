'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, total, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      {/* Backdrop */}
      <div onClick={() => setIsOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(240, 255, 240, 0.85)', backdropFilter: 'blur(5px)' }} />
      
      {/* Drawer Body */}
      <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '400px', background: '#FFFFFF', borderLeft: '1px solid #D1E8D1', padding: '40px 30px', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 style={{ fontWeight: 900, margin: 0, letterSpacing: '-1px', color: '#1D3631' }}>YOUR <span style={{ color: '#5A9B90' }}>CART</span></h2>
          <button aria-label="Close cart" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#43766D', cursor: 'pointer', fontSize: '24px' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? <p style={{ color: '#43766D', textAlign: 'center', marginTop: '50px' }}>Empty.</p> : 
            cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #E0FFE0' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '14px', color: '#1D3631' }}>{item.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F0FFF0', padding: '2px 8px', borderRadius: '4px', border: '1px solid #D1E8D1' }}>
                      <button aria-label={`Decrease quantity of ${item.title}`} onClick={() => decreaseQuantity(i)} style={{ background: 'none', border: 'none', color: '#5A9B90', cursor: 'pointer', padding: '0 4px', fontSize: '14px' }}>-</button>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2F544D' }}>{item.quantity}</span>
                      <button aria-label={`Increase quantity of ${item.title}`} onClick={() => increaseQuantity(i)} style={{ background: 'none', border: 'none', color: '#5A9B90', cursor: 'pointer', padding: '0 4px', fontSize: '14px' }}>+</button>
                    </div>
                    <button aria-label={`Remove ${item.title} from cart`} onClick={() => removeFromCart(i)} style={{ background: 'none', border: 'none', color: '#e05555', fontSize: '10px', cursor: 'pointer', padding: 0 }}>REMOVE</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontWeight: 900, color: '#5A9B90' }}>${(parseFloat(item.price.replace('$', '')) * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              </div>
            ))
          }
        </div>

        {/* 🎁 LOYALTY REWARD HOOK */}
        {cart.length > 0 && (
          <div style={{ background: 'rgba(90, 155, 144, 0.05)', border: '1px dashed #5A9B90', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <p style={{ color: '#5A9B90', fontWeight: 900, margin: '0 0 5px 0', fontSize: '12px' }}>🔥 LOYALTY REWARD ACTIVATED</p>
            <p style={{ color: '#43766D', margin: 0, fontSize: '11px', lineHeight: '1.4' }}>Purchase this order and receive an <b>11% OFF coupon</b> for your next buy instantly via email.</p>
          </div>
        )}

        <div style={{ borderTop: '1px solid #D1E8D1', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ fontWeight: 800, color: '#43766D' }}>SUBTOTAL</span>
            <span style={{ fontWeight: 900, fontSize: '22px', color: '#1D3631' }}>${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout" onClick={() => setIsOpen(false)} style={{ display: 'block', width: '100%', padding: '20px', background: '#5A9B90', color: '#FFFFFF', fontWeight: 900, borderRadius: '4px', border: 'none', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', boxShadow: '0 4px 10px rgba(90,155,144,0.3)' }}>PROCEED TO CHECKOUT →</Link>
        </div>
      </div>
    </div>
  );
}
