'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



const AdminDashboard = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    if (!userData || userData.role !== 'admin') {
      router.push('/'); // Redirect non-admin users to the homepage
    } else {
      setUserRole(userData.role);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">You are currently in <strong>/admin/dashboard</strong></p>
        <p className="text-gray-600 dark:text-gray-400">Your Role: <strong>{userRole || 'Loading...'}</strong></p>
      </div>


    </div>
  );
};

export default AdminDashboard;

