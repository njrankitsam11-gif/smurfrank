import './globals.css';
import ClientLayout from './client-layout';
import { ReduxProvider } from '@/components/ReduxProvider';

export const metadata = {
  title: 'SmurfRank | Premium Gaming Accounts',
  description: 'Buy premium ranked smurf accounts for CS2, Valorant, and GTA V with instant delivery.',
  metadataBase: new URL('https://smurfrank.vercel.app'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#F0FFF0', color: '#1D3631', fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ReduxProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}