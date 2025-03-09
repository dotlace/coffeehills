'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

type LoginRegisterProps = {
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
};

const LoginRegister: React.FC<LoginRegisterProps> = ({ onClose, onLoginSuccess }) => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Toggle between Login and Register
  const handleToggle = () => {
    setIsRegisterActive((prev) => !prev);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Close the modal
  const handleClose = () => {
    onClose();
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setErrorMessage(data.error || 'Login failed. Please try again.');
      } else {
        setErrorMessage('');
        setEmail('');
        setPassword('');
        onLoginSuccess(data.user.username); // Pass the username to UserCartIcons
        onClose();
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error === 'User already exists') {
          // If the user already exists, display a friendly message and set success message
          setErrorMessage('');
          setSuccessMessage('This email is already registered. A temporary password has been sent to your email.');
        } else {
          setErrorMessage(data.error || 'Registration failed. Please try again.');
        }
      } else {
        setErrorMessage('');
        setUsername('');
        setEmail('');
        setPassword('');
        onLoginSuccess(username); // Automatically log user in after registering
        onClose();
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-accent-deepCoffee rounded-lg p-8 w-11/12 md:w-1/2 relative flex flex-col items-center">
        {/* Close Button */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition">
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="absolute -top-16 flex justify-center">
          <Image src="/images/CMH_logo.png" alt="Cafe Mandalay Hills Logo" width={130} height={130} className="rounded-full" />
        </div>

        <div className="flex flex-col items-center justify-center p-6 w-full mt-10">
          <div className="w-full">
            {isRegisterActive ? (
              // Register Form
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <h3 className="text-2xl font-bold text-accent-beige text-center">Create Account</h3>
                {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}
                <input type="text" placeholder="Name" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee" value={email} onChange={(e) => setEmail(e.target.value)} />

                {/* Password Field with Eye Icon */}
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-gray-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded transition duration-300 hover:bg-accent-softGreen hover:text-white">Register</button>

                <p className="text-center text-accent-beige">
                  Already have an account?{' '}
                  <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">Login</span>
                </p>
              </form>
            ) : (
              // Login Form
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <h3 className="text-2xl font-bold text-accent-beige text-center">Sign In</h3>
                {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
                <input type="email" placeholder="Email" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee" value={email} onChange={(e) => setEmail(e.target.value)} />

                {/* Password Field with Eye Icon */}
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-gray-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded transition duration-300 hover:bg-accent-softGreen hover:text-white">Login</button>

                <p className="text-center text-accent-beige">
                  Don&apos;t have an account?{' '}
                  <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">Register</span>
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


// 'use client';

// import React, { useState } from 'react';
// import { X, Eye, EyeOff } from 'lucide-react';
// import Image from 'next/image';

// type LoginRegisterProps = {
//   onClose: () => void;
//   onLoginSuccess: (username: string) => void;
// };

// const LoginRegister: React.FC<LoginRegisterProps> = ({ onClose, onLoginSuccess }) => {
//   const [isRegisterActive, setIsRegisterActive] = useState(false);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Toggle between Login and Register
//   const handleToggle = () => {
//     setIsRegisterActive((prev) => !prev);
//     setErrorMessage('');
//   };

//   // Close the modal
//   const handleClose = () => {
//     onClose();
//   };

//   // Toggle Password Visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // Handle Login Submit
//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setErrorMessage('Please fill in all fields.');
//       return;
//     }

//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         setErrorMessage(data.error || 'Login failed. Please try again.');
//       } else {
//         setErrorMessage('');
//         setEmail('');
//         setPassword('');
//         onLoginSuccess(data.user.username); // Pass the username to UserCartIcons
//         onClose();
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrorMessage('An error occurred. Please try again later.');
//     }
//   };

//   // Handle Register Submit
//   const handleRegisterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!username || !email || !password) {
//       setErrorMessage('Please fill in all fields.');
//       return;
//     }

//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         setErrorMessage(data.error || 'Registration failed. Please try again.');
//       } else {
//         setErrorMessage('');
//         setUsername('');
//         setEmail('');
//         setPassword('');
//         onLoginSuccess(username); // Automatically log user in after registering
//         onClose();
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrorMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent-deepCoffee bg-opacity-50">
//       {/* Modal Content */}
//       <div className="bg-accent-deepCoffee rounded-lg p-8 w-11/12 md:w-1/2 relative flex flex-col items-center">
//         {/* Close Button */}
//         <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition">
//           <X size={24} />
//         </button>

//         {/* Logo */}
//         <div className="absolute -top-16 flex justify-center">
//           <Image src="/images/CMH_logo.png" alt="Cafe Mandalay Hills Logo" width={130} height={130} className="rounded-full" />
//         </div>

//         <div className="flex flex-col items-center justify-center p-6 w-full mt-10">
//           <div className="w-full">
//             {isRegisterActive ? (
//               // Register Form
//               <form onSubmit={handleRegisterSubmit} className="space-y-4">
//                 <h3 className="text-2xl font-bold text-accent-beige text-center">Create Account</h3>
//                 {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
//                 <input type="text" placeholder="Name" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 <input type="email" placeholder="Email" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee" value={email} onChange={(e) => setEmail(e.target.value)} />

//                 {/* Password Field with Eye Icon */}
//                 <div className="relative">
//                   <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
//                   <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-gray-600">
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>

//                 <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded transition duration-300 hover:bg-accent-softGreen hover:text-white">Register</button>

//                 <p className="text-center text-accent-beige">
//                   Already have an account?{' '}
//                   <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">Login</span>
//                 </p>
//               </form>
//             ) : (
//               // Login Form
//               <form onSubmit={handleLoginSubmit} className="space-y-4">
//                 <h3 className="text-2xl font-bold text-accent-beige text-center">Sign In</h3>
//                 {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
//                 <input type="email" placeholder="Email" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee" value={email} onChange={(e) => setEmail(e.target.value)} />

//                 {/* Password Field with Eye Icon */}
//                 <div className="relative">
//                   <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
//                   <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-gray-600">
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>

//                 <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded transition duration-300 hover:bg-accent-softGreen hover:text-white">Login</button>

//                 <p className="text-center text-accent-beige">
//                   Don&apos;t have an account?{' '}
//                   <span onClick={handleToggle} className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">Register</span>
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




