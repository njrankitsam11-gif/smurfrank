'use client';
import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(item => item.title === product.title);
      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
        return newCart;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true); // Automatically opens drawer when buying
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const increaseQuantity = (index) => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart[index].quantity = (newCart[index].quantity || 1) + 1;
      return newCart;
    });
  };

  const decreaseQuantity = (index) => {
    setCart((prev) => {
      const newCart = [...prev];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
        return newCart;
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // ⚡ BOLT OPTIMIZATION: Memoize cart total
  // 💡 What: Wrapped the total calculation in useMemo
  // 🎯 Why: Prevents recalculating the cart total on every single render when the cart hasn't changed
  // 📊 Impact: O(N) operation bypassed on unrelated state changes (like opening/closing the drawer)
  const total = useMemo(() => cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * (item.quantity || 1)), 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, isOpen, setIsOpen, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
