import './globals.css';
import { Rajdhani, Inter } from 'next/font/google';
import { ReduxProvider } from '@/components/ReduxProvider';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'SmurfRank | Premium Gaming Accounts',
  description: 'Buy premium ranked smurf accounts for CS2, Valorant, and GTA V with instant delivery.',
  metadataBase: new URL('https://smurfrank.vercel.app'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
