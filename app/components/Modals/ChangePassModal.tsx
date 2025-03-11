//ChangePassModal.tsx

'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type ChangePassModalProps = {
  email: string;
  setEmail: (value: string) => void;
  tempPassword: string;
  setTempPassword: (value: string) => void;
  handleVerifyTempPassword: () => void;
};

const ChangePassModal: React.FC<ChangePassModalProps> = ({ email, setEmail, tempPassword, setTempPassword, handleVerifyTempPassword }) => {
  const [tempPasswordVisible, setTempPasswordVisible] = useState(false);

  return (
    <div className="space-y-4 mt-6">
      <label className="block text-sm font-medium text-gray-700">Your Email</label>
      <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      
      <label className="block text-sm font-medium text-gray-700">Temporary Password</label>
      <div className="relative">
        <input type={tempPasswordVisible ? 'text' : 'password'} className="w-full p-2 border rounded" value={tempPassword} onChange={(e) => setTempPassword(e.target.value)} required />
        <button type="button" onClick={() => setTempPasswordVisible((prev) => !prev)} className="absolute right-3 top-2.5">
          {tempPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button onClick={handleVerifyTempPassword} className="w-full bg-blue-500 text-white py-2 rounded">
        Verify
      </button>
    </div>
  );
};

export default ChangePassModal;
