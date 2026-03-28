export const metadata = {
  title: 'SmurfRank | #1 Marketplace for CS2, Valorant & GTA V Accounts',
  description: 'Buy premium ranked smurf accounts for CS2, Valorant, and GTA V with instant delivery. Professional boosting, modded accounts, and verified seller marketplace.',
  keywords: 'cs2 smurf accounts, buy csgo smurfs, valorant ranked accounts, gta v modded accounts, buy smurfs, cheap gaming accounts, instant delivery smurfs',
  openGraph: {
    title: 'SmurfRank | Premium Gaming Accounts & Boosting',
    description: 'Instant delivery on top-tier CS2, Valorant, and GTA V smurf accounts. Start dominating today.',
    url: 'https://smurfrank.vercel.app',
    siteName: 'SmurfRank',
    images: [
      {
        url: 'https://smurfrank.vercel.app/favicon.ico', // Placeholder until final logo is ready
        width: 800,
        height: 600,
        alt: 'SmurfRank Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmurfRank | #1 Account Marketplace',
    description: 'Buy premium ranked smurf accounts for CS2, Valorant, and GTA V with instant delivery.',
    images: ['https://smurfrank.vercel.app/favicon.ico'],
  },
};

import HomePageClient from './page.client';

export default function HomePage() {
  return <HomePageClient />;
}
