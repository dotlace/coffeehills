'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../../../../components/UI/Loading';
import LoginRegister from '../../../../components/Auth/LoginRegister';
import Logo from '../../../../components/Layout/Logo';
import Image from 'next/image';
import ChangePassModal from '../../../../components/Modals/ChangePassModal';
import NewPassModal from '../../../../components/Modals/NewPassModal';

type AdminChangePassModalProps = {
  onClose: () => void;
};

const AdminChangePassModal: React.FC<AdminChangePassModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [verifying, setVerifying] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (showLoginModal) {
      const timer = setTimeout(() => setShowLoginModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoginModal]);

  const handleVerifyTempPassword = async () => {
    setVerifying(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/admin/verifyTempPass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tempPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage({ text: data.error || 'Verification failed. Please try again.', type: 'error' });
      } else {
        setShowNewPasswordFields(true);
        setMessage({ text: 'Verification successful! You can now set a new password.', type: 'success' });
        localStorage.setItem('token', data.token);
      }
    } catch {
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
        <Image src="/images/farm-villa.jpeg" alt="Background" layout="fill" objectFit="cover" className="absolute z-0" />

        <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/3 relative z-10">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <h3 className="text-2xl font-bold text-center">Change Your Password</h3>

          {message.text && (
            <div aria-live="polite" className={`text-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {message.text}
            </div>
          )}

          {verifying ? <Loading /> : !showNewPasswordFields && (
            <ChangePassModal 
              email={email}
              setEmail={setEmail}
              tempPassword={tempPassword}
              setTempPassword={setTempPassword}
              handleVerifyTempPassword={handleVerifyTempPassword}
            />
          )}

          {showNewPasswordFields && (
            <NewPassModal email={email} /> // ✅ Removed setShowSuccessModal
          )}

          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">×</button>
        </div>
      </div>

      {showLoginModal && (
        <LoginRegister 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={() => router.push('/dashboard')} // ✅ Redirects admin to dashboard
        />
      )}
    </>
  );
};

export default AdminChangePassModal;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Loading from '../components/UI/Loading';
// import LoginRegister from '../components/Auth/LoginRegister';
// import PassChangeModal from '../components/Modals/PassChangeModal';
// import Logo from '../components/Layout/Logo';
// import Image from 'next/image';
// import ChangePassModal from '../components/Modals/ChangePassModal';
// import NewPassModal from '../components/Modals/NewPassModal';

// type AdminChangePassModalProps = {
//   onClose: () => void;
// };

// const AdminChangePassModal: React.FC<AdminChangePassModalProps> = ({ onClose }) => {
//   const [email, setEmail] = useState('');
//   const [tempPassword, setTempPassword] = useState('');
//   const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [verifying, setVerifying] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (showSuccessModal) {
//       const timer = setTimeout(() => setShowLoginModal(true), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessModal]);

//   const handleVerifyTempPassword = async () => {
//     setVerifying(true);
//     setMessage({ text: '', type: '' });

//     try {
//       const response = await fetch('/api/admin/verifyTempPass', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, tempPassword }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         setMessage({ text: data.error || 'Verification failed. Please try again.', type: 'error' });
//       } else {
//         setShowNewPasswordFields(true);
//         setMessage({ text: 'Verification successful! You can now set a new password.', type: 'success' });
//         localStorage.setItem('token', data.token);
//       }
//     } catch {
//       setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//     } finally {
//       setVerifying(false);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
//         <Image src="/images/farm-villa.jpeg" alt="Background" layout="fill" objectFit="cover" className="absolute z-0" />

//         <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/3 relative z-10">
//           <div className="flex justify-center mb-4">
//             <Logo />
//           </div>

//           <h3 className="text-2xl font-bold text-center">Change Your Password</h3>

//           {message.text && (
//             <div aria-live="polite" className={`text-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
//               {message.text}
//             </div>
//           )}

//           {verifying ? <Loading /> : !showNewPasswordFields && (
//             <ChangePassModal 
//               email={email}
//               setEmail={setEmail}
//               tempPassword={tempPassword}
//               setTempPassword={setTempPassword}
//               handleVerifyTempPassword={handleVerifyTempPassword}
//             />
//           )}

//           {showNewPasswordFields && (
//             <NewPassModal email={email} /> // ✅ Fixed issue: Removed setShowSuccessModal
//           )}

//           <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">×</button>
//         </div>
//       </div>

//       {showSuccessModal && <PassChangeModal onConfirm={() => setShowLoginModal(true)} />}
//       {showLoginModal && (
//         <LoginRegister 
//           onClose={() => setShowLoginModal(false)} 
//           onLoginSuccess={() => router.push('/dashboard')} // ✅ Admin redirected correctly
//         />
//       )}
//     </>
//   );
// };

// export default AdminChangePassModal;




// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import Loading from '../components/UI/Loading';
// import LoginRegister from '../components/Auth/LoginRegister';
// import PassChangeModal from '../components/Modals/PassChangeModal';
// import Logo from '../components/Layout/Logo';
// import Image from 'next/image';

// type AdminChangePassModalProps = {
//   onClose: () => void;
// };

// const AdminChangePassModal: React.FC<AdminChangePassModalProps> = ({ onClose }) => {
//   const [email, setEmail] = useState('');
//   const [tempPassword, setTempPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [loading, setLoading] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const router = useRouter();

//   const [tempPasswordVisible, setTempPasswordVisible] = useState(false);
//   const [newPasswordVisible, setNewPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//   const toggleVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => setter((prev) => !prev);

//   useEffect(() => {
//     if (showSuccessModal) {
//       const timer = setTimeout(() => setShowLoginModal(true), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessModal]);

//   const handleVerifyTempPassword = async () => {
//     setVerifying(true);
//     setMessage({ text: '', type: '' });

//     try {
//       const response = await fetch('/api/admin/verifyTempPass', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, tempPassword }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         setMessage({ text: data.error || 'Verification failed. Please try again.', type: 'error' });
//       } else {
//         setShowNewPasswordFields(true);
//         setMessage({ text: 'Verification successful! You can now set a new password.', type: 'success' });
//         localStorage.setItem('token', data.token);
//       }
//     } catch {
//       setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setMessage({ text: 'Passwords do not match.', type: 'error' });
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ email, newPassword }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         setMessage({ text: data.error || 'Password change failed. Please try again.', type: 'error' });
//       } else {
//         setMessage({ text: 'Password changed successfully.', type: 'success' });
//         localStorage.removeItem('token');
//         setTimeout(() => setShowSuccessModal(true), 1500);
//       }
//     } catch {
//       setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
//         {/* ✅ Background Image */}
//         <Image src="/images/farm-villa.jpeg" alt="Background" layout="fill" objectFit="cover" className="absolute z-0" />

//         <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/3 relative z-10">
//           <div className="flex justify-center mb-4">
//             <Logo />
//           </div>

//           <h3 className="text-2xl font-bold text-center">Change Your Password</h3>

//           {message.text && (
//             <div aria-live="polite" className={`text-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
//               {message.text}
//             </div>
//           )}

//           {verifying ? <Loading /> : !showNewPasswordFields && (
//             <div className="space-y-4 mt-6">
//               <label className="block text-sm font-medium text-gray-700">Your Email</label>
//               <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
              
//               <label className="block text-sm font-medium text-gray-700">Temporary Password</label>
//               <div className="relative">
//                 <input type={tempPasswordVisible ? 'text' : 'password'} className="w-full p-2 border rounded" value={tempPassword} onChange={(e) => setTempPassword(e.target.value)} required />
//                 <button type="button" onClick={() => toggleVisibility(setTempPasswordVisible)} className="absolute right-3 top-2.5">
//                   {tempPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>

//               <button onClick={handleVerifyTempPassword} className="w-full bg-blue-500 text-white py-2 rounded" disabled={verifying}>
//                 {verifying ? 'Verifying...' : 'Verify'}
//               </button>
//             </div>
//           )}

//           {loading ? <Loading /> : showNewPasswordFields && (
//             <form onSubmit={handlePasswordChange} className="space-y-4 mt-6">
//               <label className="block text-sm font-medium text-gray-700">New Password</label>
//               <div className="relative">
//                 <input type={newPasswordVisible ? 'text' : 'password'} className="w-full p-2 border rounded" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
//                 <button type="button" onClick={() => toggleVisibility(setNewPasswordVisible)} className="absolute right-3 top-2.5">
//                   {newPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>

//               <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <div className="relative">
//                 <input type={confirmPasswordVisible ? 'text' : 'password'} className="w-full p-2 border rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                 <button type="button" onClick={() => toggleVisibility(setConfirmPasswordVisible)} className="absolute right-3 top-2.5">
//                   {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>

//               <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}>
//                 {loading ? 'Changing...' : 'Change Password'}
//               </button>
//             </form>
//           )}

//           <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">×</button>
//         </div>
//       </div>

//       {showSuccessModal && <PassChangeModal onConfirm={() => setShowLoginModal(true)} />}
//       {showLoginModal && <LoginRegister onClose={() => setShowLoginModal(false)} onLoginSuccess={() => router.push('/dashboard')} />}
//     </>
//   );
// };

// export default AdminChangePassModal;


