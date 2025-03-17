// app/Layout/Logo.tsx
'use client';

import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="fixed top-0 left-8 z-50">
      <Image 
        src="/images/CMH_Logo_Re.png" 
        alt="Cafe Mandalay Hills Logo" 
        width={150} 
        height={150} 
      />
    </div>
  );
};

export default Logo;

