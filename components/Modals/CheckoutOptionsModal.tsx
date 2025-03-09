// components/CheckoutOptionsModal.tsx
'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LoginRegister from '../Auth/LoginRegister';

type CheckoutOptionsModalProps = {
  onClose: () => void;
};

const CheckoutOptionsModal: React.FC<CheckoutOptionsModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);

  const handleGuestCheckout = () => {
    // Navigate to the guest checkout page (adjust path as needed)
    router.push('/checkout');
  };

  const handleSignInRegister = () => {
    setShowAuth(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50">
      <div className="bg-accent-deepCoffee rounded-lg p-8 w-11/12 md:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-accent-beige hover:text-accent-olive"
        >
          <X size={24} />
        </button>
        {!showAuth ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-accent-beige">Checkout Options</h2>
            <div className="space-y-4">
              <button
                onClick={handleGuestCheckout}
                className="w-full bg-accent-olive text-white py-2 rounded hover:bg-accent-stone transition"
              >
                Guest Check Out
              </button>
              <button
                onClick={handleSignInRegister}
                className="w-full bg-accent-softGreen text-white py-2 rounded hover:bg-accent-darkGreen transition"
              >
                Sign In / Register
              </button>
            </div>
          </>
        ) : (
          // When Sign In/Register is chosen, show the auth modal
          <LoginRegister onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default CheckoutOptionsModal;
