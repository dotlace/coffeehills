'use client';

import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

type ConfirmPassChangeModalProps = {
  onConfirm: () => void; // ✅ Only keep onConfirm since onClose was unused
};

const ConfirmPassChangeModal: React.FC<ConfirmPassChangeModalProps> = ({ onConfirm }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm(); // ✅ Redirect to login page after timeout
    }, 3000); // ✅ Automatically redirect after 3 seconds

    return () => clearTimeout(timer); // ✅ Clear timeout if modal is closed earlier
  }, [onConfirm]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/3 flex flex-col items-center">
      
        {/* ✅ Success Icon */}
        <CheckCircle size={60} className="text-green-500 mb-4" />

        {/* ✅ Success Message */}
        <h3 className="text-2xl font-bold text-center text-green-600">
          Password Changed Successfully!
        </h3>
        <p className="text-gray-600 text-center mt-2">
          Redirecting you to login...
        </p>

        {/* ✅ Confirm Button */}
        <button
          onClick={onConfirm}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ConfirmPassChangeModal;