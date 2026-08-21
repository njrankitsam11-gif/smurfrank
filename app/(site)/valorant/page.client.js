'use client';
import GameListingsPage from '../../../components/marketplace/GameListingsPage';

export default function ValorantPage({ listings }) {
  return <GameListingsPage game="Valorant" listings={listings} />;
}
