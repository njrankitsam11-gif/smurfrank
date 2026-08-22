'use client';
import { MotionConfig } from 'framer-motion';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';
import AuthProvider from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import EnquireWidget from '../components/EnquireWidget';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MotionConfig reducedMotion="user">
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
            <EnquireWidget />
          </CartProvider>
        </MotionConfig>
      </AuthProvider>
    </ThemeProvider>
  );
}
