'use client';

import React from 'react';
import '../UI/loading.css'; 

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
