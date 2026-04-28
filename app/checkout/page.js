'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const PAYMENT_METHODS = [
  { id: 'credit-card', name: 'Credit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿' },
  { id: 'stripe', name: 'Stripe', icon: '💰' },
  { id: 'razorpay', name: 'Razorpay', icon: '⚡' },
];

const CRYPTO_COINS = ['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDT (TRC-20)', 'Litecoin (LTC)'];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total } = useCart();

  const [selectedMethod, setSelectedMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form state
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cryptoCoin, setCryptoCoin] = useState(CRYPTO_COINS[0]);

  const fee = total * 0.025;
  const grandTotal = total + fee;

  const formatCard = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = v => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => router.push('/checkout/success'), 1800);
  };

  return (
    <main style={s.page}>
      <style>{`
        .focus-outline:focus-visible {
          outline: 2px solid #FF6A00;
          outline-offset: 2px;
        }
      `}</style>
      {/* ── HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ color: '#5A9B90', fontSize: 11, fontWeight: 900, letterSpacing: 4, margin: '0 0 8px' }}>SECURE CHECKOUT</p>
        <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1.5px', margin: 0, color: '#1D3631' }}>
          Complete Your <span style={{ color: '#5A9B90' }}>Order</span>
        </h1>
        <p style={{ color: '#43766D', fontSize: 12, marginTop: 10 }}>🔒 256-bit SSL encrypted · Escrow protected · Instant delivery</p>
      </div>

      <div style={s.grid} className="checkout-grid">

        {/* ══ LEFT: PAYMENT ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* METHOD SELECTOR */}
          <div style={s.card}>
            <Label>1. Select Payment Method</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              {PAYMENT_METHODS.map(m => (
                <label key={m.id} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 18px',
                  border: `1px solid ${selectedMethod === m.id ? '#5A9B90' : '#D1E8D1'}`,
                  borderRadius: 8, cursor: 'pointer',
                  background: selectedMethod === m.id ? 'rgba(90, 155, 144, 0.06)' : '#FFFFFF',
                  color: '#1D3631',
                  transition: 'all 0.2s',
                }}>
                  <input
                    className="focus-outline"
                    type="radio" name="payment_method" value={m.id}
                    checked={selectedMethod === m.id}
                    onChange={() => setSelectedMethod(m.id)}
                    style={{ accentColor: '#5A9B90', width: 18, height: 18 }}
                  />
                  <span style={{ fontSize: 22 }}>{m.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{m.name}</span>
                  {selectedMethod === m.id && (
                    <span style={{ marginLeft: 'auto', color: '#5A9B90', fontSize: 11, fontWeight: 900 }}>SELECTED</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* PAYMENT DETAILS */}
          <div style={s.card}>
            <Label>2. Payment Details</Label>
            <p style={{ color: '#43766D', fontSize: 12, fontStyle: 'italic', margin: '12px 0 20px' }}>
              API integration for <strong style={{ color: '#1D3631' }}>{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</strong> will be configured with your keys.
            </p>

            {/* CREDIT CARD */}
            {selectedMethod === 'credit-card' && (
              <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Card Visual */}
                <div style={s.cardPreview}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: 2, color: '#1D3631' }}>SMURFRANK</span>
                    <span style={{ fontSize: 22 }}>💳</span>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 18, letterSpacing: 4, color: '#1D3631', marginTop: 18 }}>
                    {cardNum || '•••• •••• •••• ••••'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
                    <div>
                      <div style={{ fontSize: 9, color: '#43766D', letterSpacing: 2 }}>CARD HOLDER</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#1D3631' }}>{nameOnCard || 'YOUR NAME'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 9, color: '#43766D', letterSpacing: 2 }}>EXPIRES</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#1D3631' }}>{expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                <Field id="cc-name" label="Cardholder Name" required>
                  <input id="cc-name" required aria-required="true" autoComplete="cc-name" className="focus-outline" style={s.input} placeholder="John Doe" value={nameOnCard}
                    onChange={e => setNameOnCard(e.target.value)} />
                </Field>
                <Field id="cc-number" label="Card Number" required>
                  <input id="cc-number" required aria-required="true" autoComplete="cc-number" className="focus-outline" style={s.input} placeholder="1234 5678 9012 3456" value={cardNum}
                    onChange={e => setCardNum(formatCard(e.target.value))} inputMode="numeric" />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field id="cc-exp" label="Expiry" required>
                    <input id="cc-exp" required aria-required="true" autoComplete="cc-exp" className="focus-outline" style={s.input} placeholder="MM/YY" value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))} inputMode="numeric" />
                  </Field>
                  <Field id="cc-csc" label="CVC" required>
                    <input id="cc-csc" required aria-required="true" autoComplete="cc-csc" className="focus-outline" style={s.input} placeholder="•••" value={cvc}
                      onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} inputMode="numeric" />
                  </Field>
                </div>
                <PayBtn isProcessing={isProcessing} total={grandTotal} />
              </form>
            )}

            {/* PAYPAL / STRIPE / RAZORPAY */}
            {['paypal', 'stripe', 'razorpay'].includes(selectedMethod) && (
              <form onSubmit={handlePayment}>
                <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>
                    {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.icon}
                  </div>
                  <p style={{ color: '#43766D', lineHeight: 1.7, marginBottom: 20, fontSize: 14 }}>
                    You'll be redirected to the <strong style={{ color: '#1D3631' }}>
                      {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</strong> secure portal.
                    Your order details will be pre-filled.
                  </p>
                  <div style={s.pendingBadge}>
                    ⚡ {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name} integration pending — API keys to be configured
                  </div>
                </div>
                <PayBtn isProcessing={isProcessing} total={grandTotal}
                  label={`Pay with ${PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}`} />
              </form>
            )}

            {/* CRYPTO */}
            {selectedMethod === 'crypto' && (
              <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field id="crypto-coin" label="Select Coin">
                  <select id="crypto-coin" className="focus-outline" style={{ ...s.input, cursor: 'pointer' }} value={cryptoCoin}
                    onChange={e => setCryptoCoin(e.target.value)}>
                    {CRYPTO_COINS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <div style={{ background: '#F9FCF9', border: '1px solid #D1E8D1', borderRadius: 10, padding: 18 }}>
                  <p style={{ color: '#5A9B90', fontSize: 11, letterSpacing: 2, margin: '0 0 10px', fontWeight: 800 }}>WALLET ADDRESS</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <code style={{ color: '#1D3631', fontSize: 12, wordBreak: 'break-all', flex: 1 }}>
                      WALLET_ADDRESS_PENDING_SETUP
                    </code>
                    <button type="button" style={s.ghostBtn}
                      onClick={() => navigator.clipboard?.writeText('WALLET_ADDRESS_PENDING_SETUP')}>
                      COPY
                    </button>
                  </div>
                </div>
                <div style={{ background: 'rgba(90, 155, 144, 0.04)', border: '1px dashed #5A9B90', borderRadius: 8, padding: '14px 18px', fontSize: 12, color: '#5A9B90', lineHeight: 1.6 }}>
                  ⚠️ Send <strong>${grandTotal.toFixed(2)} USD</strong> worth of {cryptoCoin}. Orders confirmed after 3 network confirmations.
                </div>
                <PayBtn isProcessing={isProcessing} total={grandTotal} label="I've Sent the Payment" color="#5A9B90" textColor="#FFFFFF" />
              </form>
            )}
          </div>
        </div>

        {/* ══ RIGHT: ORDER SUMMARY ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div style={{ ...s.card, position: 'sticky', top: 20 }}>
            <Label>Order Summary</Label>

            <div style={{ marginTop: 16 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <p style={{ color: '#43766D', marginBottom: 16 }}>Your cart is empty.</p>
                  <Link href="/" style={{ color: '#5A9B90', fontSize: 13, fontWeight: 800 }}>← Browse Listings</Link>
                </div>
              ) : (
                cart.map((item, i) => {
                  const qty = item.quantity || 1;
                  const itemTotal = (parseFloat(String(item.price).replace('$', '')) * qty).toFixed(2);
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid #D1E8D1' }}>
                      <div style={{ flex: 1, paddingRight: '15px' }}>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: 13, color: '#1D3631' }}>{item.title}</p>
                        {item.game && <p style={{ margin: '4px 0 0', fontSize: 10, color: '#43766D', fontWeight: 700, letterSpacing: 1 }}>{item.game} {qty > 1 && <span style={{ color: '#5A9B90', fontWeight: 900, marginLeft: 6 }}>x {qty}</span>}</p>}
                        {!item.game && qty > 1 && <p style={{ margin: '4px 0 0', fontSize: 10, color: '#5A9B90', fontWeight: 900, letterSpacing: 1 }}>x {qty}</p>}
                      </div>
                      <span style={{ fontWeight: 900, color: '#5A9B90', whiteSpace: 'nowrap', marginLeft: 12 }}>${itemTotal}</span>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <PriceLine label="Subtotal" val={`$${total.toFixed(2)}`} />
                <PriceLine label="Processing Fee (2.5%)" val={`$${fee.toFixed(2)}`} dim />
                <div style={{ borderTop: '1px solid #D1E8D1', marginTop: 16, paddingTop: 16 }}>
                  <PriceLine label="TOTAL" val={`$${grandTotal.toFixed(2)}`} bold color="#5A9B90" />
                </div>
              </div>
            )}
          </div>

          {/* TRUST BADGES */}
          <div style={s.card}>
            {[
              { icon: '🔒', title: 'Escrow Protected', desc: 'Payment held safely until delivery is confirmed.' },
              { icon: '⚡', title: 'Instant Delivery', desc: 'Credentials sent to email within 15 minutes.' },
              { icon: '🔄', title: 'Dispute Protection', desc: '24/7 support + full refund if order fails.' },
            ].map(b => (
              <div key={b.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: 22, width: 32, flexShrink: 0, marginTop: 2 }}>{b.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 900, fontSize: 12, color: '#1D3631' }}>{b.title}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 11, color: '#43766D', lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* LOYALTY REWARD */}
          <div style={{ background: 'rgba(90, 155, 144, 0.04)', border: '1px dashed #5A9B90', borderRadius: 10, padding: '18px 20px' }}>
            <p style={{ color: '#5A9B90', fontWeight: 900, margin: '0 0 6px', fontSize: 12 }}>🔥 LOYALTY REWARD</p>
            <p style={{ color: '#43766D', margin: 0, fontSize: 11, lineHeight: 1.5 }}>
              Complete this order and get an <strong style={{ color: '#1D3631' }}>11% OFF coupon</strong> for your next purchase — sent instantly to your inbox.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── HELPERS ── */

function Label({ children }) {
  return <p style={{ margin: 0, fontSize: 10, fontWeight: 900, letterSpacing: 3, color: '#5A9B90', textTransform: 'uppercase' }}>{children}</p>;
}

function Field({ id, label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: '#43766D' }}>{label.toUpperCase()}</label>
      {children}
    </div>
  );
}

function PriceLine({ label, val, dim, bold, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      <span style={{ fontSize: bold ? 14 : 12, fontWeight: bold ? 900 : 700, color: dim ? '#43766D' : '#1D3631' }}>{label}</span>
      <span style={{ fontSize: bold ? 20 : 13, fontWeight: 900, color: color || '#1D3631' }}>{val}</span>
    </div>
  );
}

function PayBtn({ isProcessing, total, label, color = '#5A9B90', textColor = '#FFFFFF' }) {
  return (
    <button type="submit" disabled={isProcessing} className="focus-outline" style={{
      width: '100%', padding: '16px',
      background: isProcessing ? '#D1E8D1' : color,
      color: isProcessing ? '#43766D' : textColor,
      fontWeight: 900, fontSize: 14, letterSpacing: 2,
      border: 'none', borderRadius: 6,
      cursor: isProcessing ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s', textTransform: 'uppercase',
      boxShadow: '0 4px 10px rgba(90,155,144,0.3)',
    }}>
      {isProcessing ? 'Processing...' : label || `Pay $${total.toFixed(2)}`}
    </button>
  );
}

/* ── STYLES ── */
const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(rgba(255,255,255,0.85), rgba(240,255,240,0.92)), url("https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '60px 5vw 80px',
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#1D3631',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: 28,
    maxWidth: 1100,
    margin: '0 auto',
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid #D1E8D1',
    borderRadius: 12,
    padding: '28px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
  },
  cardPreview: {
    background: 'linear-gradient(135deg,#F0FFF0 0%,#E0FFE0 50%,#D1E8D1 100%)',
    border: '1px solid #D1E8D1',
    borderRadius: 14,
    padding: '22px 26px',
    height: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 10px 20px rgba(90, 155, 144, 0.1)',
  },
  input: {
    width: '100%',
    background: '#F9FCF9',
    border: '1px solid #D1E8D1',
    borderRadius: 8,
    padding: '13px 16px',
    color: '#1D3631',
    fontSize: 14,
    fontFamily: 'Inter, monospace',
    outline: 'none',
  },
  pendingBadge: {
    background: 'rgba(90, 155, 144, 0.06)',
    border: '1px solid rgba(90, 155, 144, 0.3)',
    borderRadius: 8,
    padding: '12px 16px',
    fontSize: 12,
    color: '#5A9B90',
    marginBottom: 20,
    display: 'inline-block',
  },
  ghostBtn: {
    background: 'none',
    border: '1px solid #D1E8D1',
    color: '#5A9B90',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: 11,
    letterSpacing: 1,
    padding: '8px 14px',
    whiteSpace: 'nowrap',
  },
};

