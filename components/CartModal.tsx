// components/CartModal.tsx
'use client';

import React from 'react';
import { useCart } from '@/context/CartContent';
import { X, Trash } from 'lucide-react';
import CheckoutButton from './CheckoutButton';

type CartModalProps = {
  onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { cart, addToCart, removeFromCart, decrementFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>The cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementFromCart(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 text-red-600 hover:text-red-800"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <p className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-4">
              <CheckoutButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;


