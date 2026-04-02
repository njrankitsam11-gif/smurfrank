import './globals.css';
import ClientLayout from './client-layout';

export const metadata = {
  title: 'SmurfRank | Premium Gaming Accounts',
  description: 'Buy premium ranked smurf accounts for CS2, Valorant, and GTA V with instant delivery.',
  metadataBase: new URL('https://smurfrank.vercel.app'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}