'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type RegisterFormProps = {
  onToggle: () => void;
  onShowRegMsg: () => void; // New prop to show RegMsgModal
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggle, onShowRegMsg }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
        setErrorMessage(data.error || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('');
        setUsername('');
        setEmail('');
        setPassword('');

        // Call onShowRegMsg to display RegMsgModal and then switch to login
        onShowRegMsg();
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit} className="space-y-4">
      <h3 className="text-2xl font-bold text-accent-beige text-center">Create Account</h3>
      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2 rounded bg-accent-beige text-accent-deepCoffee"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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

      <button type="submit" className="w-full bg-accent-stone text-accent-beige py-2 rounded transition duration-300 hover:bg-accent-softGreen hover:text-white">
        Register
      </button>

      <p className="text-center text-accent-beige">
        Already have an account?{' '}
        <span onClick={onToggle} className="text-accent-softGreen cursor-pointer transition duration-300 hover:text-accent-stone">
          Login
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;



