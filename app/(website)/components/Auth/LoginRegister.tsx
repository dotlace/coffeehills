import React, { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';
import RegMsgModal from './RegMsgModal';

type LoginRegisterProps = {
  onClose: () => void;
  onLoginSuccess?: (username: string) => void;
};

const LoginRegister: React.FC<LoginRegisterProps> = ({ onClose, onLoginSuccess }) => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [showRegMsgModal, setShowRegMsgModal] = useState(false);

  // Function to show RegMsgModal and then switch to Login Form
  const handleShowRegMsg = () => {
    setShowRegMsgModal(true);

    setTimeout(() => {
      setShowRegMsgModal(false);
      setIsRegisterActive(false); // Switch to login form
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50">
      {showRegMsgModal ? (
        <RegMsgModal message="Registration Successful! You can now log in." onClose={() => setShowRegMsgModal(false)} />
      ) : (
        <div className="bg-accent-deepCoffee rounded-lg p-8 w-11/12 md:w-1/2 relative flex flex-col items-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition">
            <X size={24} />
          </button>

          <div className="absolute -top-16 flex justify-center">
            <Image src="/images/CMH_logo.png" alt="Cafe Mandalay Hills Logo" width={130} height={130} className="rounded-full" />
          </div>

          <div className="w-full mt-10 p-6">
            {isRegisterActive ? (
              <RegisterForm onToggle={() => setIsRegisterActive(false)} onShowRegMsg={handleShowRegMsg} />
            ) : (
              <LoginForm onToggle={() => setIsRegisterActive(true)} onLoginSuccess={onLoginSuccess} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;


