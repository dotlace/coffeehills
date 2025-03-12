'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ClipboardList, BarChart, Settings } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../UI/ThemeToggle';
import UserMenu from '../Navigation/UserMenu';

const Sidebar = () => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const menuItems = [
    { label: 'Home', path: '/admin/dashboard', icon: <Home size={22} /> },
    { label: 'Product Management', path: '/admin/dashboard/products', icon: <Package size={22} /> },
    { label: 'Order History', path: '/admin/dashboard/orders', icon: <ClipboardList size={22} /> },
    { label: 'Analytics', path: '/admin/dashboard/analytics', icon: <BarChart size={22} /> },
    { label: 'Settings', path: '/admin/dashboard/settings', icon: <Settings size={22} /> },
  ];

  return (
    <aside className="h-screen w-16 bg-accent-beige dark:bg-gray-800 flex flex-col justify-between py-4 shadow-lg border-r border-gray-300 dark:border-gray-800 pt-20">
      {/* Sidebar Menu Items */}
      <div className="flex flex-col items-center space-y-4">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`));

          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 
                ${isActive ? 'bg-accent-softGreen text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen'}`}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.icon}
                {hovered === item.label && (
                  <span className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section - User Icon and Theme Toggle */}
      <div className="flex flex-col items-center space-y-4 pb-4 bg-accent-beige dark:bg-gray-800 relative">
        {/* User Menu (Dropdown) */}
        <UserMenu />

        {/* Theme Toggle (No hover effect) */}
        <div className="flex justify-center p-3">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;



// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Home, Package, ClipboardList, BarChart, Settings, User, LogOut } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import ThemeToggle from '../UI/ThemeToggle';

// const Sidebar = () => {
//   const pathname = usePathname();
//   const [hovered, setHovered] = useState<string | null>(null);
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

//   const menuItems = [
//     { label: 'Home', path: '/admin/dashboard', icon: <Home size={22} /> },
//     { label: 'Product Management', path: '/admin/dashboard/products', icon: <Package size={22} /> },
//     { label: 'Order History', path: '/admin/dashboard/orders', icon: <ClipboardList size={22} /> },
//     { label: 'Analytics', path: '/admin/dashboard/analytics', icon: <BarChart size={22} /> },
//     { label: 'Settings', path: '/admin/dashboard/settings', icon: <Settings size={22} /> },
//   ];

//   return (
//     <aside className="h-screen w-16 bg-accent-beige dark:bg-gray-800 flex flex-col justify-between py-4 shadow-lg border-r border-gray-300 dark:border-gray-800 pt-20">
//       {/* Sidebar Menu Items */}
//       <div className="flex flex-col items-center space-y-4">
//         {menuItems.map((item) => {
//           const isActive =
//             pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`));

//           return (
//             <Link key={item.path} href={item.path}>
//               <div
//                 className={`relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 
//                 ${isActive ? 'bg-accent-softGreen text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen'}`}
//                 onMouseEnter={() => setHovered(item.label)}
//                 onMouseLeave={() => setHovered(null)}
//               >
//                 {item.icon}
//                 {hovered === item.label && (
//                   <span className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap">
//                     {item.label}
//                   </span>
//                 )}
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Bottom Section - User Icon and Theme Toggle */}
//       <div className="flex flex-col items-center space-y-4 pb-4 bg-accent-beige dark:bg-gray-800 relative">
//         {/* User Icon - Clickable for Dropdown */}
//         <div ref={dropdownRef} className="relative">
//           <div
//             className="relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <User size={24} />
//           </div>

//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2">
//               <button
//                 className="flex items-center w-full px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen"
//                 onClick={() => console.log('Logging out...')} // Replace with actual logout logic
//               >
//                 <LogOut size={18} className="mr-2" /> Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Theme Toggle (No hover effect) */}
//         <div className="flex justify-center p-3">
//           <ThemeToggle />
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Home, Package, ClipboardList, BarChart, Settings, User } from 'lucide-react';
// import { useState } from 'react';
// import ThemeToggle from '../UI/ThemeToggle';

// const Sidebar = () => {
//   const pathname = usePathname();
//   const [hovered, setHovered] = useState<string | null>(null);

//   const menuItems = [
//     { label: 'Home', path: '/admin/dashboard', icon: <Home size={22} /> },
//     { label: 'Product Management', path: '/admin/dashboard/products', icon: <Package size={22} /> },
//     { label: 'Order History', path: '/admin/dashboard/orders', icon: <ClipboardList size={22} /> },
//     { label: 'Analytics', path: '/admin/dashboard/analytics', icon: <BarChart size={22} /> },
//     { label: 'Settings', path: '/admin/dashboard/settings', icon: <Settings size={22} /> },
//   ];

//   return (
//     <aside className="h-screen w-16 bg-accent-beige dark:bg-gray-800 flex flex-col justify-between py-4 shadow-lg border-r border-gray-300 dark:border-gray-800 pt-20">
//       {/* Sidebar Menu Items */}
//       <div className="flex flex-col items-center space-y-4">
//         {menuItems.map((item) => {
//           const isActive =
//             pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`));

//           return (
//             <Link key={item.path} href={item.path}>
//               <div
//                 className={`relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 
//                 ${isActive ? 'bg-accent-softGreen text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen'}`}
//                 onMouseEnter={() => setHovered(item.label)}
//                 onMouseLeave={() => setHovered(null)}
//               >
//                 {item.icon}
//                 {hovered === item.label && (
//                   <span className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap">
//                     {item.label}
//                   </span>
//                 )}
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/*Bottom Section - User Icon and Theme Toggle*/}
//       <div className="flex flex-col items-center space-y-4 pb-4">
//         {/* User Icon */}
//         <div
//           className="relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen cursor-pointer"
//           onMouseEnter={() => setHovered('Profile')}
//           onMouseLeave={() => setHovered(null)}
//         >
//           <User size={24} />
//           {hovered === 'Profile' && (
//             <span className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap">
//               Profile
//             </span>
//           )}
//         </div> 

//         {/* Theme Toggle (No hover effect) */}
//         <div className="flex justify-center p-3">
//           <ThemeToggle />
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


