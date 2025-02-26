'use client';

import React from 'react';

type CardButtonProps = {
  onClick: () => void;
  label: string;
};

const CardButton: React.FC<CardButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full bg-accent-deepCoffee text-white py-2 rounded hover:bg-accent-darkGreen transition"
    >
      {label}
    </button>
  );
};

export default CardButton;
