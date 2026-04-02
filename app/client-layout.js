'use client';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';

export default function ClientLayout({ children }) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
