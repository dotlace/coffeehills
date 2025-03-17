'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut } from 'lucide-react';
import LogoutMsgModal from '@/app/(website)/components/Auth/LogoutMsgModal';
import Loading from '@/app/(website)/components/UI/Loading';

const UserMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle modal close
  const handleCloseModal = () => {
    setIsLoggingOut(false);
    router.push('/'); // Redirect after modal closes
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggingOut(true); // Show loading and modal

    setTimeout(() => {
      // Clear authentication data
      localStorage.removeItem('token'); // If using JWT stored in local storage
      sessionStorage.clear(); // Clear session
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear cookies
    }, 2000); // Simulated delay before clearing session
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* User Icon - Clickable for Dropdown */}
      <div
        className="relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <User size={24} />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2">
          <button
            className="flex items-center w-full px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>
      )}

      {/* Show Logout Modal & Loading when logging out */}
      {isLoggingOut && (
        <>
          <LogoutMsgModal message="You have been logged out." onClose={handleCloseModal} />
          <Loading />
        </>
      )}
    </div>
  );
};

export default UserMenu;



// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, LogOut } from 'lucide-react';

// const UserMenu = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     // Clear authentication data (adjust based on your auth setup)
//     localStorage.removeItem('token'); // If using JWT stored in local storage
//     sessionStorage.clear(); // Clear session
//     document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear cookies

//     // Redirect to homepage
//     router.push('/');
//   };

//   return (
//     <div ref={dropdownRef} className="relative">
//       {/* User Icon - Clickable for Dropdown */}
//       <div
//         className="relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen cursor-pointer"
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//       >
//         <User size={24} />
//       </div>

//       {/* Dropdown Menu */}
//       {dropdownOpen && (
//         <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2">
//           <button
//             className="flex items-center w-full px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen"
//             onClick={handleLogout}
//           >
//             <LogOut size={18} className="mr-2" /> Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserMenu;


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { User, LogOut } from 'lucide-react';

// const UserMenu = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={dropdownRef} className="relative">
//       {/* User Icon - Clickable for Dropdown */}
//       <div
//         className="relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen cursor-pointer"
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//       >
//         <User size={24} />
//       </div>

//       {/* Dropdown Menu */}
//       {dropdownOpen && (
//         <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2">
//           <button
//             className="flex items-center w-full px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen"
//             onClick={() => console.log('Logging out...')} // Replace with actual logout logic
//           >
//             <LogOut size={18} className="mr-2" /> Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserMenu;
