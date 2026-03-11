'use client';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}