'use client';

import React, { useEffect } from 'react';
import Logo from '../Layout/Logo'; // Correct import path
import '../Auth/LogInOutMsgModal.css';

type LogoutMsgModalProps = {
  message: string;
  onClose: () => void;
};

const LogoutMsgModal: React.FC<LogoutMsgModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-close modal after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Logo Component */}
        <Logo /> {/* Ensure the logo is rendered here */}

        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* Logout Message */}
        <p className="logout-message">{message}</p>
      </div>
    </div>
  );
};

export default LogoutMsgModal;






