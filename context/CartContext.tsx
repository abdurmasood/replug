'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartItemsCount: number;
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Load cart items from localStorage on component mount
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      const existingItemIndex = newItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        newItems[existingItemIndex].quantity += 1;
      } else {
        newItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartItemsCount, isCartOpen, addToCart, removeFromCart, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
