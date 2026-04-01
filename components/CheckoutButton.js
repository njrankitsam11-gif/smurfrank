'use client';

import { useRouter } from 'next/navigation';

export default function CheckoutButton({ listingId }) {
  const router = useRouter();

  const handleCheckout = () => {
    // Force a full page navigation bypassing client router if necessary,
    // but try Next.js router first.
    window.location.assign(`/checkout?listingId=${listingId}`);
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        display: 'block',
        width: '100%',
        background: 'linear-gradient(45deg, #FF6A00, #e65c00)',
        color: '#000',
        padding: '20px',
        fontWeight: 900,
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(255,106,0,0.2)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 9999
      }}
    >
      Proceed to Purchase
    </button>
  );
}
