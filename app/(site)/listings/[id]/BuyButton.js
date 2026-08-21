'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../../context/CartContext';
import Button from '../../../../components/ui/Button';

export default function BuyButton({ listing }) {
  const router = useRouter();
  const { addToCart } = useCart();

  function handleClick() {
    addToCart({
      id: listing.id,
      listingId: listing.id,
      title: listing.title,
      price: `$${listing.price.toFixed(2)}`,
      desc: [listing.rank, listing.region].filter(Boolean).join(' · '),
      game: listing.game,
    });
    router.push('/checkout');
  }

  return (
    <Button onClick={handleClick} variant="primary" size="lg" className="w-full">
      Proceed to Purchase
    </Button>
  );
}
