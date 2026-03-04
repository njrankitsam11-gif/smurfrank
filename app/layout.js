import "./globals.css";

export const metadata = {
  title: {
    default: 'SmurfRank — Buy CS2, Valorant & GTA V Smurf Accounts',
    template: '%s | SmurfRank'
  },
  description: 'Buy ranked smurf accounts for CS2, Valorant and GTA V. Instant delivery, escrow protected, verified sellers. UAE, NA, EU, SEA, SA regions.',
  verification: {
    google: 'p4bRNCBLstjbJWMwHzm-GRIOKwRnDpSt8LY4aHuCugQ',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Press **Ctrl+S** then push:
```
git add .
```
```
git commit -m "Google Search Console verification"
```
```
git push