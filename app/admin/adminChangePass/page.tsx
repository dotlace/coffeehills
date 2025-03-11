'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminChangePass from '../dashboard/components/Modals/AdminChangePassModal'; // ✅ Correct import

const AdminChangePassPage = () => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  return (
    <div>
      {token && (
        <AdminChangePass onClose={() => router.push('/login')} />
      )}
    </div>
  );
};

export default AdminChangePassPage;

