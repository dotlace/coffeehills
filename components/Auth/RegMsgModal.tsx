'use client';

import React, { useEffect } from 'react';
import '../Auth/RegMsgModal.css';

type RegMsgModalProps = {
  message: string;
  onClose: () => void;
};

const RegMsgModal: React.FC<RegMsgModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-close modal after 4 seconds
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* Animated Checkmark inside Circle */}
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>

        {/* Success Message */}
        <p className="success-message">{message}</p>
      </div>
    </div>
  );
};

export default RegMsgModal;


