// coffeehills/components/Forms/LoginForm.tsx

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loading from '../UI/Loading';

type LoginFormProps = {
  onToggle: () => void;  // Add onToggle here
  onLoginSuccess?: (username: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onToggle, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setErrorMessage(data.error || 'Login failed. Please try again.');
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (onLoginSuccess) {
          onLoginSuccess(data.user.username);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="space-y-4">
      <h3 className="text-2xl font-bold text-accent-beige text-center">Sign In</h3>
      {loading && <Loading />}
      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-gray-600">
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <p className="text-center text-accent-beige mt-2">
        <a href="/forgot-password" className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">
          Forgot password?
        </a>
      </p>

      <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded transition duration-300 hover:bg-accent-softGreen hover:text-white">
        Login
      </button>

      <p className="text-center text-accent-beige">
        Don&apos;t have an account?{' '}
        <span onClick={onToggle} className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">
          Register
        </span>
      </p>
    </form>
  );
};

export default LoginForm;


// 'use client';

// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import Loading from '../UI/Loading';

// type LoginFormProps = {
//   onLoginSuccess?: (username: string) => void;
// };

// const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // ✅ Single API call for both admin and users
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (!response.ok) {
//         setErrorMessage(data.error || 'Login failed. Please try again.');
//       } else {
//         localStorage.setItem('user', JSON.stringify(data.user));

//         // ✅ Redirect based on user role
//         if (data.user.role === 'admin') {
//           router.push('/admin/dashboard'); // ✅ Redirect admin
//         } else if (onLoginSuccess) {
//           onLoginSuccess(data.user.username);
//         }
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setLoading(false);
//       setErrorMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleLoginSubmit} className="space-y-4">
//       <h3 className="text-2xl font-bold text-accent-beige text-center">Sign In</h3>
//       {loading && <Loading />} {/* ✅ Show loading while logging in */}
//       {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <div className="relative">
//         <input
//           type={showPassword ? 'text' : 'password'}
//           placeholder="Password"
//           className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee pr-10"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-gray-600">
//           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//         </button>
//       </div>

//       {/* ✅ Forgot Password Link */}
//       <p className="text-center text-accent-beige mt-2">
//         <a href="/forgot-password" className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">
//           Forgot password?
//         </a>
//       </p>

//       <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded transition duration-300 hover:bg-accent-softGreen hover:text-white">
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;



