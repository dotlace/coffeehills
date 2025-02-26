// components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
