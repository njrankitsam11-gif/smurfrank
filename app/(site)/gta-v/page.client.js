'use client';
import GameListingsPage from '../../../components/marketplace/GameListingsPage';

export default function GTAVPageClient({ listings }) {
  return <GameListingsPage game="GTA V" listings={listings} />;
}
