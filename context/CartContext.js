'use client';
import { createContext, useContext, useState, useEffect } from 'react';

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

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isOpen, setIsOpen, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);