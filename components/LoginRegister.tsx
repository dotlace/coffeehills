// components/LoginRegister.tsx
'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import { X } from 'lucide-react';

type LoginRegisterProps = {
  onClose: () => void;
};

const LoginRegister: React.FC<LoginRegisterProps> = ({ onClose }) => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggle = () => {
    setIsRegisterActive((prev) => !prev);
    setErrorMessage(''); // Clear error messages when toggling between login and register
  };

  const handleClose = () => {
    onClose();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    console.log('Sending registration data:', { username, email, password });


    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        setErrorMessage(data.error || 'Registration failed. Please try again.');
      } else {
        // Registration successful
        setErrorMessage('');
        setUsername('');
        setEmail('');
        setPassword('');
        alert('Registration successful! You can now log in.'); // Provide feedback to the user
        setIsRegisterActive(false); // Switch to login form after successful registration
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        setErrorMessage(data.error || 'Login failed. Please try again.');
      } else {
        // Login successful
        setErrorMessage('');
        setEmail('');
        setPassword('');
        alert('Login successful!'); // Provide feedback to the user
        handleClose(); // Close the modal after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    // Modal Container: fixed overlay with semi-transparent background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50">
      {/* Modal Content: fixed size, centered, with padding and rounded corners */}
      <div className="bg-accent-deepCoffee rounded-lg p-8 w-11/12 md:w-1/2 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
        {/* Optionally include a Logo here if desired */}
        <div className="flex justify-center my-4">
          <Logo />
        </div>
        {/* Main Form Content */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full">
            {isRegisterActive ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-accent-beige">Create Account</h3>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded">
                  Register
                </button>
                <p className="text-center text-accent-beige">
                  Already have an account?{' '}
                  <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer">
                    Login
                  </span>
                </p>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-accent-beige">Sign In</h3>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded">
                  Login
                </button>
                <p className="text-center text-accent-beige">
                  Don't have an account?{' '}
                  <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer">
                    Register
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

// // components/LoginRegister.tsx
// 'use client';

// import React, { useState } from 'react';
// import Logo from './Logo';
// import { X } from 'lucide-react';

// type LoginRegisterProps = {
//   onClose: () => void;
// };

// const LoginRegister: React.FC<LoginRegisterProps> = ({ onClose }) => {
//   const [isRegisterActive, setIsRegisterActive] = useState(false);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleToggle = () => {
//     setIsRegisterActive((prev) => !prev);
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   const handleRegisterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Call the registration endpoint
//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, email, password }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setErrorMessage(data.message || 'Registration failed. Please try again.');
//       } else {
//         // Registration successful, clear the form
//         setErrorMessage('');
//         setUsername('');
//         setEmail('');
//         setPassword('');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrorMessage('An error occurred. Please try again later.');
//     }
//   };

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Login logic goes here
//     // For now, simply clear the form
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     // Modal Container: fixed overlay with semi-transparent background
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50">
//       {/* Modal Content: fixed size, centered, with padding and rounded corners */}
//       <div className="bg-accent-deepCoffee rounded-lg p-8 w-11/12 md:w-1/2 relative">
//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-white hover:text-gray-300"
//         >
//           <X size={24} />
//         </button>
//         {/* Optionally include a Logo here if desired */}
//         <div className="flex justify-center my-4">
//           <Logo />
//         </div>
//         {/* Main Form Content */}
//         <div className="flex flex-col items-center justify-center p-4">
//           <div className="w-full">
//             {isRegisterActive ? (
//               <form onSubmit={handleRegisterSubmit} className="space-y-4">
//                 <h3 className="text-xl font-bold text-accent-beige">Create Account</h3>
//                 {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full border p-2 rounded"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full border p-2 rounded"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full border p-2 rounded"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded">
//                   Register
//                 </button>
//                 <p className="text-center text-accent-beige">
//                   Already have an account?{' '}
//                   <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer">
//                     Login
//                   </span>
//                 </p>
//               </form>
//             ) : (
//               <form onSubmit={handleLoginSubmit} className="space-y-4">
//                 <h3 className="text-xl font-bold text-accent-beige">Sign In</h3>
//                 {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full border p-2 rounded"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full border p-2 rounded"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded">
//                   Login
//                 </button>
//                 <p className="text-center text-accent-beige">
//                   Don't have an account?{' '}
//                   <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer">
//                     Register
//                   </span>
//                 </p>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;


// // components/LoginRegister.tsx
// 'use client';

// import React, { useState } from 'react';
// import Logo from './Logo';
// import { X } from 'lucide-react';

// type LoginRegisterProps = {
//   onClose: () => void;
// };

// const LoginRegister: React.FC<LoginRegisterProps> = ({ onClose }) => {
//   const [isRegisterActive, setIsRegisterActive] = useState(false);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleToggle = () => {
//     setIsRegisterActive((prev) => !prev);
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   const handleRegisterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Registration logic goes here
//     // For now, simply clear the form
//     setUsername('');
//     setEmail('');
//     setPassword('');
//   };

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Login logic goes here
//     // For now, simply clear the form
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     // Modal Container: fixed overlay with semi-transparent background
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50">

//       {/* Modal Content: fixed size, centered, with padding and rounded corners */}
//       <div className="bg-accent-deepCoffee rounded-lg p-8 w-11/12 md:w-1/2 relative">

//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-white hover:text-gray-300"
//         >
//           <X size={24} />
//         </button>
//         {/* Main Form Content */}
//         <div className="flex flex-col items-center justify-center p-4">
//           <div className="w-full">
//             {isRegisterActive ? (
//               <form onSubmit={handleRegisterSubmit} className="space-y-4">
//                 <h3 className="text-xl font-bold text-accent-beige">Create Account</h3>
//                 {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full border p-2 rounded"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full border p-2 rounded"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full border p-2 rounded"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded">
//                   Register
//                 </button>
//                 <p className="text-center text-accent-beige">
//                   Already have an account?{' '}
//                   <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer">
//                     Login
//                   </span>
//                 </p>
//               </form>
//             ) : (
//               <form onSubmit={handleLoginSubmit} className="space-y-4">
//                 <h3 className="text-xl font-bold text-accent-beige">Sign In</h3>
//                 {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full border p-2 rounded"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full border p-2 rounded"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded">
//                   Login
//                 </button>
//                 <p className="text-center text-accent-beige">
//                   Don't have an account?{' '}
//                   <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer">
//                     Register
//                   </span>
//                 </p>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;



