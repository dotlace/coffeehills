// components/CheckoutButton.tsx
'use client';

import React, { useState } from 'react';
import CheckoutOptionsModal from '../Modals/CheckoutOptionsModal';

const CheckoutButton: React.FC = () => {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenOptions(true)}
        className="w-full bg-accent-deepCoffee text-accent-beige py-2 rounded hover:bg-accent-darkGreen transition"
      >
        Check Out
      </button>
      {openOptions && (
        <CheckoutOptionsModal onClose={() => setOpenOptions(false)} />
      )}
    </>
  );
};

export default CheckoutButton;



