'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data
  const orderDetails = {
    title: 'Global Elite CS2 Account',
    game: 'Counter-Strike 2',
    price: 149.99,
    fee: 4.99,
    total: 154.98
  };

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿' },
    { id: 'stripe', name: 'Stripe', icon: '💰' },
    { id: 'razorpay', name: 'Razorpay', icon: '⚡' }
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      router.push('/checkout/success');
    }, 1500);
  };

  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '30px' }}>Secure <span style={{ color: '#FF6A00' }}>Checkout</span></h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>

          {/* Left Column: Payment Methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <section style={{ background: '#0f0f17', border: '1px solid #1a1a1a', padding: '30px', borderRadius: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>Select Payment Method</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {paymentMethods.map(method => (
                  <label
                    key={method.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '15px 20px',
                      border: `1px solid ${selectedMethod === method.id ? '#FF6A00' : '#222'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: selectedMethod === method.id ? 'rgba(255, 106, 0, 0.05)' : '#15151e',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      style={{ marginRight: '15px', accentColor: '#FF6A00', width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '24px', marginRight: '15px' }}>{method.icon}</span>
                    <span style={{ fontSize: '16px', fontWeight: 600 }}>{method.name}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Mock Form details based on selected method */}
            <section style={{ background: '#0f0f17', border: '1px solid #1a1a1a', padding: '30px', borderRadius: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>Payment Details</h2>

              <div style={{ color: '#888', fontStyle: 'italic', marginBottom: '20px' }}>
                API integration for {paymentMethods.find(m => m.id === selectedMethod)?.name} will be added later.
              </div>

              {selectedMethod === 'credit-card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input type="text" placeholder="Card Number" style={{ width: '100%', padding: '12px', background: '#1a1a24', border: '1px solid #333', color: 'white', borderRadius: '4px' }} disabled />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '12px', background: '#1a1a24', border: '1px solid #333', color: 'white', borderRadius: '4px' }} disabled />
                    <input type="text" placeholder="CVC" style={{ width: '100%', padding: '12px', background: '#1a1a24', border: '1px solid #333', color: 'white', borderRadius: '4px' }} disabled />
                  </div>
                  <input type="text" placeholder="Cardholder Name" style={{ width: '100%', padding: '12px', background: '#1a1a24', border: '1px solid #333', color: 'white', borderRadius: '4px' }} disabled />
                </div>
              )}

              {selectedMethod === 'crypto' && (
                <div style={{ background: '#1a1a24', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>qr</div>
                  <p style={{ color: '#aaa', fontSize: '14px' }}>Scan QR code or send to address:<br/><strong>bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</strong></p>
                </div>
              )}

              {(selectedMethod === 'paypal' || selectedMethod === 'stripe' || selectedMethod === 'razorpay') && (
                <div style={{ background: '#1a1a24', padding: '20px', borderRadius: '6px', textAlign: 'center', color: '#aaa' }}>
                  You will be redirected to the {paymentMethods.find(m => m.id === selectedMethod)?.name} gateway to complete your purchase securely.
                </div>
              )}
            </section>

          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div style={{ background: '#0f0f17', border: '1px solid #1a1a1a', padding: '30px', borderRadius: '8px', position: 'sticky', top: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>Order Summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <div style={{ color: '#aaa', fontSize: '14px', marginBottom: '4px' }}>{orderDetails.game}</div>
                  <div style={{ fontWeight: 600, fontSize: '16px' }}>{orderDetails.title}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa' }}>
                  <span>Subtotal</span>
                  <span>${orderDetails.price.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa' }}>
                  <span>Processing Fee</span>
                  <span>${orderDetails.fee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '20px', marginTop: '10px', color: 'white' }}>
                  <span>Total</span>
                  <span style={{ color: '#FF6A00' }}>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  background: isProcessing ? '#883a00' : '#FF6A00',
                  color: isProcessing ? '#ccc' : '#000',
                  padding: '16px',
                  fontWeight: 900,
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'background 0.2s'
                }}
              >
                {isProcessing ? 'Processing...' : `Pay $${orderDetails.total.toFixed(2)}`}
              </button>

              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666' }}>
                🔒 Secure 256-bit SSL encryption
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
