'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

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
  const { cart, total, clearCart } = useCart();

  const [selectedMethod, setSelectedMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

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

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaymentError('');
    setIsProcessing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Payment could not be completed.');
      }

      clearCart();
      router.push('/checkout/success');
    } catch (err) {
      setPaymentError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <main style={s.page}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ color: '#FFC531', fontSize: 11, fontWeight: 900, letterSpacing: 4, margin: '0 0 8px' }}>SECURE CHECKOUT</p>
        <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1.5px', margin: 0, color: 'var(--ink-50)' }}>
          Complete Your <span style={{ color: '#FFC531' }}>Order</span>
        </h1>
        <p style={{ color: 'var(--ink-200)', fontSize: 12, marginTop: 10 }}>🔒 256-bit SSL encrypted · Money-back guarantee · Instant delivery</p>
      </div>

      <div style={s.grid} className="checkout-grid">

        {/* ══ LEFT: PAYMENT ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {paymentError && (
            <div role="alert" style={{ background: 'rgba(255,70,85,0.1)', border: '1px solid rgba(255,70,85,0.4)', color: '#FF8A94', padding: '12px 16px', borderRadius: 8, fontSize: 13 }}>
              {paymentError}
            </div>
          )}

          {/* METHOD SELECTOR */}
          <div style={s.card}>
            <Label>1. Select Payment Method</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              {PAYMENT_METHODS.map(m => (
                <label key={m.id} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 18px',
                  border: `1px solid ${selectedMethod === m.id ? '#FFC531' : 'var(--ink-600)'}`,
                  borderRadius: 8, cursor: 'pointer',
                  background: selectedMethod === m.id ? 'rgba(255, 197, 49, 0.08)' : 'var(--ink-800)',
                  color: 'var(--ink-50)',
                  transition: 'all 0.2s',
                }}>
                  <input
                    className="focus-ring"
                    type="radio" name="payment_method" value={m.id}
                    checked={selectedMethod === m.id}
                    onChange={() => setSelectedMethod(m.id)}
                    style={{ accentColor: '#FFC531', width: 18, height: 18 }}
                  />
                  <span style={{ fontSize: 22 }}>{m.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{m.name}</span>
                  {selectedMethod === m.id && (
                    <span style={{ marginLeft: 'auto', color: '#FFC531', fontSize: 11, fontWeight: 900 }}>SELECTED</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* PAYMENT DETAILS */}
          <div style={s.card}>
            <Label>2. Payment Details</Label>
            <p style={{ color: 'var(--ink-200)', fontSize: 12, fontStyle: 'italic', margin: '12px 0 20px' }}>
              API integration for <strong style={{ color: 'var(--ink-50)' }}>{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</strong> will be configured with your keys.
            </p>

            {/* CREDIT CARD */}
            {selectedMethod === 'credit-card' && (
              <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Card Visual */}
                <div style={s.cardPreview}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: 2, color: 'var(--ink-50)' }}>SMURFRANK</span>
                    <span style={{ fontSize: 22 }}>💳</span>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 18, letterSpacing: 4, color: 'var(--ink-50)', marginTop: 18 }}>
                    {cardNum || '•••• •••• •••• ••••'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
                    <div>
                      <div style={{ fontSize: 9, color: 'var(--ink-200)', letterSpacing: 2 }}>CARD HOLDER</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-50)' }}>{nameOnCard || 'YOUR NAME'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 9, color: 'var(--ink-200)', letterSpacing: 2 }}>EXPIRES</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-50)' }}>{expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                <Field id="cc-name" label="Cardholder Name" required>
                  <input id="cc-name" required aria-required="true" autoComplete="cc-name" className="focus-ring" style={s.input} placeholder="John Doe" value={nameOnCard}
                    onChange={e => setNameOnCard(e.target.value)} />
                </Field>
                <Field id="cc-number" label="Card Number" required>
                  <input id="cc-number" required aria-required="true" autoComplete="cc-number" className="focus-ring" style={s.input} placeholder="1234 5678 9012 3456" value={cardNum}
                    onChange={e => setCardNum(formatCard(e.target.value))} inputMode="numeric" />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field id="cc-exp" label="Expiry" required>
                    <input id="cc-exp" required aria-required="true" autoComplete="cc-exp" className="focus-ring" style={s.input} placeholder="MM/YY" value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))} inputMode="numeric" />
                  </Field>
                  <Field id="cc-csc" label="CVC" required>
                    <input id="cc-csc" required aria-required="true" autoComplete="cc-csc" className="focus-ring" style={s.input} placeholder="•••" value={cvc}
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
                  <p style={{ color: 'var(--ink-200)', lineHeight: 1.7, marginBottom: 20, fontSize: 14 }}>
                    You'll be redirected to the <strong style={{ color: 'var(--ink-50)' }}>
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
                  <select id="crypto-coin" className="focus-ring" style={{ ...s.input, cursor: 'pointer' }} value={cryptoCoin}
                    onChange={e => setCryptoCoin(e.target.value)}>
                    {CRYPTO_COINS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <div style={{ background: 'var(--ink-800)', border: '1px solid var(--ink-600)', borderRadius: 10, padding: 18 }}>
                  <p style={{ color: '#FFC531', fontSize: 11, letterSpacing: 2, margin: '0 0 10px', fontWeight: 800 }}>WALLET ADDRESS</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <code style={{ color: 'var(--ink-50)', fontSize: 12, wordBreak: 'break-all', flex: 1 }}>
                      WALLET_ADDRESS_PENDING_SETUP
                    </code>
                    <button type="button" style={s.ghostBtn}
                      onClick={() => navigator.clipboard?.writeText('WALLET_ADDRESS_PENDING_SETUP')}>
                      COPY
                    </button>
                  </div>
                </div>
                <div style={{ background: 'rgba(255, 197, 49, 0.06)', border: '1px dashed #FFC531', borderRadius: 8, padding: '14px 18px', fontSize: 12, color: '#FFC531', lineHeight: 1.6 }}>
                  ⚠️ Send <strong>${grandTotal.toFixed(2)} USD</strong> worth of {cryptoCoin}. Orders confirmed after 3 network confirmations.
                </div>
                <PayBtn isProcessing={isProcessing} total={grandTotal} label="I've Sent the Payment" />
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
                  <p style={{ color: 'var(--ink-200)', marginBottom: 16 }}>Your cart is empty.</p>
                  <Link href="/" style={{ color: '#FFC531', fontSize: 13, fontWeight: 800 }}>← Browse Listings</Link>
                </div>
              ) : (
                cart.map((item, i) => {
                  const qty = item.quantity || 1;
                  const itemTotal = (parseFloat(String(item.price).replace('$', '')) * qty).toFixed(2);
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid var(--ink-600)' }}>
                      <div style={{ flex: 1, paddingRight: '15px' }}>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: 13, color: 'var(--ink-50)' }}>{item.title}</p>
                        {item.game && <p style={{ margin: '4px 0 0', fontSize: 10, color: 'var(--ink-200)', fontWeight: 700, letterSpacing: 1 }}>{item.game} {qty > 1 && <span style={{ color: '#FFC531', fontWeight: 900, marginLeft: 6 }}>x {qty}</span>}</p>}
                        {!item.game && qty > 1 && <p style={{ margin: '4px 0 0', fontSize: 10, color: '#FFC531', fontWeight: 900, letterSpacing: 1 }}>x {qty}</p>}
                      </div>
                      <span style={{ fontWeight: 900, color: '#FFC531', whiteSpace: 'nowrap', marginLeft: 12 }}>${itemTotal}</span>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <PriceLine label="Subtotal" val={`$${total.toFixed(2)}`} />
                <PriceLine label="Processing Fee (2.5%)" val={`$${fee.toFixed(2)}`} dim />
                <div style={{ borderTop: '1px solid var(--ink-600)', marginTop: 16, paddingTop: 16 }}>
                  <PriceLine label="TOTAL" val={`$${grandTotal.toFixed(2)}`} bold color="#FFC531" />
                </div>
              </div>
            )}
          </div>

          {/* TRUST BADGES */}
          <div style={s.card}>
            {[
              { icon: '🛡️', title: 'Money-Back Guarantee', desc: 'Full refund if your order fails to deliver.' },
              { icon: '⚡', title: 'Instant Delivery', desc: 'Credentials sent to email within 15 minutes.' },
              { icon: '🎧', title: '24/7 Support', desc: 'Real humans, not a bot, whenever you need us.' },
            ].map(b => (
              <div key={b.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: 22, width: 32, flexShrink: 0, marginTop: 2 }}>{b.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 900, fontSize: 12, color: 'var(--ink-50)' }}>{b.title}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--ink-200)', lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* LOYALTY REWARD */}
          <div style={{ background: 'rgba(255, 197, 49, 0.06)', border: '1px dashed #FFC531', borderRadius: 10, padding: '18px 20px' }}>
            <p style={{ color: '#FFC531', fontWeight: 900, margin: '0 0 6px', fontSize: 12 }}>🔥 LOYALTY REWARD</p>
            <p style={{ color: 'var(--ink-200)', margin: 0, fontSize: 11, lineHeight: 1.5 }}>
              Complete this order and get an <strong style={{ color: 'var(--ink-50)' }}>11% OFF coupon</strong> for your next purchase — sent instantly to your inbox.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── HELPERS ── */

function Label({ children }) {
  return <p style={{ margin: 0, fontSize: 10, fontWeight: 900, letterSpacing: 3, color: '#FFC531', textTransform: 'uppercase' }}>{children}</p>;
}

function Field({ id, label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--ink-200)' }}>{label.toUpperCase()}</label>
      {children}
    </div>
  );
}

function PriceLine({ label, val, dim, bold, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      <span style={{ fontSize: bold ? 14 : 12, fontWeight: bold ? 900 : 700, color: dim ? 'var(--ink-200)' : 'var(--ink-50)' }}>{label}</span>
      <span style={{ fontSize: bold ? 20 : 13, fontWeight: 900, color: color || 'var(--ink-50)' }}>{val}</span>
    </div>
  );
}

function PayBtn({ isProcessing, total, label }) {
  return (
    <button type="submit" disabled={isProcessing} className="focus-ring" style={{
      width: '100%', padding: '16px',
      background: isProcessing ? 'var(--ink-400)' : '#FFC531',
      color: isProcessing ? 'var(--ink-200)' : '#06070A',
      fontWeight: 900, fontSize: 14, letterSpacing: 2,
      border: 'none', borderRadius: 6,
      cursor: isProcessing ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s', textTransform: 'uppercase',
      boxShadow: isProcessing ? 'none' : '0 8px 24px -6px rgba(255, 197, 49, 0.45)',
    }}>
      {isProcessing ? 'Processing...' : label || `Pay $${total.toFixed(2)}`}
    </button>
  );
}

/* ── STYLES ── */
const s = {
  page: {
    minHeight: '100vh',
    background: 'var(--ink-950)',
    padding: '60px 5vw 80px',
    fontFamily: 'Inter, Arial, sans-serif',
    color: 'var(--ink-50)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: 28,
    maxWidth: 1100,
    margin: '0 auto',
  },
  card: {
    background: 'var(--ink-800)',
    border: '1px solid var(--ink-600)',
    borderRadius: 12,
    padding: '28px',
  },
  cardPreview: {
    background: 'linear-gradient(135deg,var(--ink-700) 0%,var(--ink-600) 50%,var(--ink-500) 100%)',
    border: '1px solid var(--ink-600)',
    borderRadius: 14,
    padding: '22px 26px',
    height: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    background: 'var(--ink-700)',
    border: '1px solid var(--ink-600)',
    borderRadius: 8,
    padding: '13px 16px',
    color: 'var(--ink-50)',
    fontSize: 14,
    fontFamily: 'Inter, monospace',
    outline: 'none',
  },
  pendingBadge: {
    background: 'rgba(255, 197, 49, 0.06)',
    border: '1px solid rgba(255, 197, 49, 0.3)',
    borderRadius: 8,
    padding: '12px 16px',
    fontSize: 12,
    color: '#FFC531',
    marginBottom: 20,
    display: 'inline-block',
  },
  ghostBtn: {
    background: 'none',
    border: '1px solid var(--ink-600)',
    color: '#FFC531',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: 11,
    letterSpacing: 1,
    padding: '8px 14px',
    whiteSpace: 'nowrap',
  },
};
