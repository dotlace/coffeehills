// components/Footer.tsx
'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary py-4">
      <div className="container mx-auto text-center text-sm text-gray-800">
        <p>© {new Date().getFullYear()} Cafe Mandalay Hills. Designed and Developed by DotLace.</p>
      </div>
    </footer>
  );
};

export default Footer;
