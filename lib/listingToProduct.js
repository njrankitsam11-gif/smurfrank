export function listingToProduct(listing) {
  const desc = [listing.rank, listing.region].filter(Boolean).join(' • ')
    || listing.description?.slice(0, 60)
    || '';

  return {
    id: listing.id,
    listingId: listing.id,
    title: listing.title,
    price: `$${listing.price.toFixed(2)}`,
    desc,
    game: listing.game,
  };
}
