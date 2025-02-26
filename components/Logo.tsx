// components/Logo.tsx
'use client';

import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="fixed top-4 left-8 z-50">
      <Image 
        src="/images/CMH_Logo_Re.png" 
        alt="Cafe Mandalay Hills Logo" 
        width={100} 
        height={100} 
      />
    </div>
  );
};

export default Logo;
