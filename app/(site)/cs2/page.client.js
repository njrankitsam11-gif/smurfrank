'use client';
import GameListingsPage from '../../../components/marketplace/GameListingsPage';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'CS2 Prime Accounts Marketplace',
  description: 'Buy high-tier CS2 Prime accounts, Global Elite, and Faceit accounts.',
};

export default function CS2Page({ listings }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GameListingsPage game="CS2" listings={listings} />
    </>
  );
}
