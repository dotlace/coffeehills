// components/MessageSentButton.tsx

'use client';

import React, { useState } from 'react';

interface MessageSentButtonProps {
  onClick: (e: React.FormEvent) => void;
}

const MessageSentButton: React.FC<MessageSentButtonProps> = ({ onClick }) => {
  const [isSent, setIsSent] = useState(false);

  const handleClick = (e: React.FormEvent) => {
    setIsSent(true);
    onClick(e); // Pass the event to the onClick handler
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-accent.brown text-white p-2 rounded hover:bg-accent-darkGreen transition"
    >
      {isSent ? 'Message Sent' : 'Send Message'}
    </button>
  );
};

export default MessageSentButton;
