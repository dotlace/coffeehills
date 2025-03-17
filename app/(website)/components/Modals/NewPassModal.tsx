'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginRegister from '../Auth/LoginRegister';
import ConfirmPassChangeModal from './ConfirmPassChangeModal';
import Loading from '../UI/Loading'; // ✅ Import Loading component

type NewPassModalProps = {
  email: string;
  onClose?: () => void; // ✅ Make `onClose` optional
};

const NewPassModal: React.FC<NewPassModalProps> = ({ email, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // ✅ Step 1: Hide Change Password modal (only if onClose exists)
    if (onClose) {
      onClose();
    }
    
    setLoading(true); // ✅ Show loading animation

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || 'Password change failed. Please try again.');
      } else {
        // ✅ Step 2: Password changed → Hide loading and show ConfirmPassChangeModal
        setLoading(false);
        setShowConfirmModal(true);

        // ✅ Step 3: After 2 seconds, show LoginRegister modal
        setTimeout(() => {
          setShowConfirmModal(false);
          setShowLogin(true);
        }, 2000);
      }
    } catch {
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  // ✅ Step 4: Show LoginRegister modal after ConfirmPassChangeModal disappears
  if (showLogin) {
    return <LoginRegister onClose={() => setShowLogin(false)} />;
  }

  // ✅ Step 3: Show ConfirmPassChangeModal before transitioning to LoginRegister modal
  if (showConfirmModal) {
    return <ConfirmPassChangeModal onConfirm={() => setShowLogin(true)} />;
  }

  // ✅ Step 2: Show Loading only while updating the password
  if (loading) {
    return <Loading />;
  }

  // ✅ Show Change Password Form if none of the above conditions are met
  return (
    <form onSubmit={handlePasswordChange} className="space-y-4 mt-6">
      <label className="block text-sm font-medium text-gray-700">New Password</label>
      <div className="relative">
        <input
          type={newPasswordVisible ? 'text' : 'password'}
          className="w-full p-2 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setNewPasswordVisible((prev) => !prev)}
          className="absolute right-3 top-2.5"
        >
          {newPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
      <div className="relative">
        <input
          type={confirmPasswordVisible ? 'text' : 'password'}
          className="w-full p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setConfirmPasswordVisible((prev) => !prev)}
          className="absolute right-3 top-2.5"
        >
          {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
        disabled={newPassword.length < 6 || newPassword !== confirmPassword}
      >
        Change Password
      </button>
    </form>
  );
};

export default NewPassModal;


// 'use client';

// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import LoginRegister from '../Auth/LoginRegister';
// import ConfirmPassChangeModal from './ConfirmPassChangeModal';
// import Loading from '../UI/Loading'; // ✅ Import Loading component

// type NewPassModalProps = {
//   email: string;
//   onClose: () => void; // ✅ Function to close the Change Password modal
// };

// const NewPassModal: React.FC<NewPassModalProps> = ({ email, onClose }) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [newPasswordVisible, setNewPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newPassword.length < 6) {
//       alert('Password must be at least 6 characters long.');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       alert('Passwords do not match.');
//       return;
//     }

//     // ✅ Step 1: Hide Change Password modal & Show Loading
//     onClose(); // Close the modal immediately
//     setLoading(true);

//     try {
//       const response = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, newPassword }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         alert(data.error || 'Password change failed. Please try again.');
//       } else {
//         // ✅ Step 2: Password changed → Hide loading and show ConfirmPassChangeModal
//         setLoading(false);
//         setShowConfirmModal(true);

//         // ✅ Step 3: After 2 seconds, show LoginRegister modal
//         setTimeout(() => {
//           setShowConfirmModal(false);
//           setShowLogin(true);
//         }, 2000);
//       }
//     } catch {
//       alert('An error occurred. Please try again.');
//       setLoading(false);
//     }
//   };

//   // ✅ Step 4: Show LoginRegister modal after ConfirmPassChangeModal disappears
//   if (showLogin) {
//     return <LoginRegister onClose={() => setShowLogin(false)} />;
//   }

//   // ✅ Step 3: Show ConfirmPassChangeModal before transitioning to LoginRegister modal
//   if (showConfirmModal) {
//     return <ConfirmPassChangeModal onConfirm={() => setShowLogin(true)} />;
//   }

//   // ✅ Step 2: Show Loading only while updating the password
//   if (loading) {
//     return <Loading />;
//   }

//   // ✅ Show Change Password Form if none of the above conditions are met
//   return (
//     <form onSubmit={handlePasswordChange} className="space-y-4 mt-6">
//       <label className="block text-sm font-medium text-gray-700">New Password</label>
//       <div className="relative">
//         <input
//           type={newPasswordVisible ? 'text' : 'password'}
//           className="w-full p-2 border rounded"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button
//           type="button"
//           onClick={() => setNewPasswordVisible((prev) => !prev)}
//           className="absolute right-3 top-2.5"
//         >
//           {newPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
//         </button>
//       </div>

//       <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//       <div className="relative">
//         <input
//           type={confirmPasswordVisible ? 'text' : 'password'}
//           className="w-full p-2 border rounded"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button
//           type="button"
//           onClick={() => setConfirmPasswordVisible((prev) => !prev)}
//           className="absolute right-3 top-2.5"
//         >
//           {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
//         </button>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded"
//         disabled={newPassword.length < 6 || newPassword !== confirmPassword}
//       >
//         Change Password
//       </button>
//     </form>
//   );
// };

// export default NewPassModal;


