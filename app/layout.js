import "./globals.css";

export const metadata = {
  title: {
    default: 'SmurfRank — Buy CS2, Valorant & GTA V Smurf Accounts',
    template: '%s | SmurfRank'
  },
  description: 'Buy ranked smurf accounts for CS2, Valorant and GTA V. Instant delivery, escrow protected, verified sellers. From $9.99.',
  keywords: ['smurf accounts', 'buy cs2 smurf account', 'buy valorant smurf account', 'gta v modded account', 'cheap smurf accounts', 'instant delivery gaming accounts'],
  openGraph: {
    title: 'SmurfRank — Buy CS2, Valorant & GTA V Smurf Accounts',
    description: 'Buy ranked smurf accounts for CS2, Valorant and GTA V. Instant delivery, escrow protected, verified sellers. From $9.99.',
    url: 'https://smurfrank.vercel.app',
    siteName: 'SmurfRank',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmurfRank — Buy CS2, Valorant & GTA V Smurf Accounts',
    description: 'Buy ranked smurf accounts for CS2, Valorant and GTA V. Instant delivery, escrow protected, verified sellers. From $9.99.',
  },
  verification: {
    google: 'p4bRNCBLstjbJWMwHzm-GRIOKwRnDpSt8LY4aHuCugQ',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'SmurfRank',
  url: 'https://smurfrank.vercel.app',
  description: 'Buy ranked smurf accounts for CS2, Valorant and GTA V. Instant delivery, escrow protected, verified sellers.',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Credit Card',
  priceRange: '$9.99 - $99.99',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '9.99',
    highPrice: '99.99',
    priceCurrency: 'USD',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}