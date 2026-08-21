'use client';
import { MotionConfig } from 'framer-motion';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';

export default function ClientLayout({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </CartProvider>
    </MotionConfig>
  );
}
