import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';

export default async function ListingPage({ params }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id } });

  if (!listing) return notFound();

  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 40px' }}>
        <a href="/" style={{ color: '#FF6A00', textDecoration: 'none', fontSize: '12px' }}>← Back to Marketplace</a>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginTop: '20px' }}>{listing.title}</h1>
        <div style={{ color: '#FF6A00', fontSize: '24px', fontWeight: 900, margin: '20px 0' }}>${Number(listing.price).toFixed(2)}</div>
        <div style={{ padding: '20px', background: '#0f0f17', border: '1px solid #1a1a1a', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '10px' }}><strong>Game:</strong> {listing.game}</div>
          <div style={{ marginBottom: '10px' }}><strong>Rank:</strong> {listing.rank}</div>
          <div style={{ marginBottom: '10px' }}><strong>Region:</strong> {listing.region}</div>
        </div>
        <button style={{ width: '100%', padding: '20px', background: '#FF6A00', border: 'none', fontWeight: 900, marginTop: '20px', cursor: 'pointer' }}>BUY NOW</button>
      </div>
    </main>
  );
}