'use client';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}