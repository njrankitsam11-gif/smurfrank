'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../../context/CartContext';

export default function BuyButton({ listing }) {
  const router = useRouter();
  const { addToCart } = useCart();

  function handleClick() {
    addToCart({
      id: listing.id,
      listingId: listing.id,
      title: listing.title,
      price: `$${listing.price.toFixed(2)}`,
      desc: [listing.rank, listing.region].filter(Boolean).join(' • '),
      game: listing.game,
    });
    router.push('/checkout');
  }

  return (
    <button
      onClick={handleClick}
      style={{ width: '100%', background: 'linear-gradient(45deg, #FF6A00, #e65c00)', color: '#000', padding: '20px', fontWeight: 900, fontSize: '16px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s ease', boxShadow: '0 5px 15px rgba(255,106,0,0.2)' }}
    >
      Proceed to Purchase
    </button>
  );
}
