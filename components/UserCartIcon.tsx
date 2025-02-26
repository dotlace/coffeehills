// components/UserCartIcons.tsx
'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContent';
import { ShoppingCart, User } from 'lucide-react';
import CartModal from './CartModal';
import LoginRegister from './LoginRegister';

const UserCartIcons: React.FC = () => {
  const { cart, cartVisible } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Calculate total number of items in the cart.
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {cartVisible && (
          <div
            className="relative bg-white/40 p-2 rounded cursor-pointer"
            onClick={() => setCartModalOpen(true)}
          >
            <ShoppingCart size={32} className="text-accent-deepCoffee" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-olive text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        )}
        <div
          className="bg-white/40 p-2 rounded cursor-pointer"
          onClick={() => setLoginModalOpen(true)}
        >
          <User size={32} className="text-accent-deepCoffee" />
        </div>
      </div>
      {cartModalOpen && (
        <CartModal onClose={() => setCartModalOpen(false)} />
      )}
      {loginModalOpen && (
        <LoginRegister onClose={() => setLoginModalOpen(false)} />
      )}
    </>
  );
};

export default UserCartIcons;


