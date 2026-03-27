'use client';
import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setIsOpen(true); // Automatically opens drawer when buying
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ⚡ BOLT OPTIMIZATION: Memoize cart total
  // 💡 What: Wrapped the total calculation in useMemo
  // 🎯 Why: Prevents recalculating the cart total on every single render when the cart hasn't changed
  // 📊 Impact: O(N) operation bypassed on unrelated state changes (like opening/closing the drawer)
  const total = useMemo(() => cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isOpen, setIsOpen, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);