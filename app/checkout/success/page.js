export const metadata = {
  title: 'Order Successful | SmurfRank',
  robots: { index: false, follow: false }, // A++ SEO: Tell Google NOT to show this page in search
};

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px', padding: '40px', background: '#0f0f17', border: '1px solid #1a1a1a' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>Order <span style={{ color: '#FF6A00' }}>Confirmed</span></h1>
        <p style={{ color: '#888', lineHeight: 1.6, marginBottom: '30px' }}>
          Thank you for your purchase! Your payment is currently held in our secure escrow.
          The account credentials have been sent to your registered email address.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href="/" style={{ background: '#FF6A00', color: '#000', padding: '14px', fontWeight: 900, textDecoration: 'none', textTransform: 'uppercase' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
