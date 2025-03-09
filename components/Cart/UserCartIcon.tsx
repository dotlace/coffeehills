'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, Settings, List } from 'lucide-react';
import { useCart } from '@/context/CartContent';
import CartModal from '../Modals/CartModal';
import LoginRegister from '../Auth/LoginRegister';
import LoginMsgModal from '../Auth/LoginMsgModal';
import LogoutMsgModal from '../Auth/LogoutMsgModal';

const UserCartIcons: React.FC = () => {
  const { cart, cartVisible } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userInitials, setUserInitials] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUserInitials(storedUsername.charAt(0).toUpperCase());
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleLoginSuccess = (username: string) => {
    localStorage.setItem('username', username);
    setUserInitials(username.charAt(0).toUpperCase());
    setUsername(username);
    setLoginModalOpen(false);
    setShowLoginMsg(true);

    setTimeout(() => {
      setShowLoginMsg(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUserInitials(null);
    setUsername(null);
    setDropdownOpen(false);
    setShowLogoutMsg(true);

    setTimeout(() => {
      setShowLogoutMsg(false);
    }, 3000);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {cartVisible && (
          <div className="relative bg-white/40 p-2 rounded cursor-pointer" onClick={() => setCartModalOpen(true)}>
            <ShoppingCart size={32} className="text-accent-deepCoffee" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-olive text-white text-xs font-bold px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        )}

        {/* User Icon / Initials */}
        <div className="relative">
          {/* When no user is logged in, clicking the UserIcon opens the login modal */}
          {!userInitials ? (
            <div className="bg-white/40 p-2 rounded cursor-pointer" onClick={() => setLoginModalOpen(true)}>
              <User size={32} className="text-accent-deepCoffee" />
            </div>
          ) : (
            // When user is logged in, clicking the Initials toggles the dropdown
            <div className="bg-white/40 p-2 rounded cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="w-8 h-8 flex items-center justify-center bg-accent-softGreen text-white rounded-full text-lg font-bold">
                {userInitials}
              </div>
            </div>
          )}

          {/* Dropdown Menu (Only when clicking User Initials) */}
          {userInitials && dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden">
              <ul className="py-2 text-accent-deepCoffee">
                <li className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:text-accent-softGreen">
                  <List className="mr-2" size={18} /> Order History
                </li>
                <li className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:text-accent-softGreen">
                  <Settings className="mr-2" size={18} /> Settings
                </li>
                <li
                  className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:text-accent-bourbon"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2" size={18} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {cartModalOpen && <CartModal onClose={() => setCartModalOpen(false)} />}
      {loginModalOpen && <LoginRegister onClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      
      {showLoginMsg && username && <LoginMsgModal message={`Welcome to Coffee Hills, ${username}!`} onClose={() => setShowLoginMsg(false)} />}
      {showLogoutMsg && <LogoutMsgModal message="Thank you for visiting Coffee Hills, see you again soon!" onClose={() => setShowLogoutMsg(false)} />}
    </>
  );
};

export default UserCartIcons;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ShoppingCart, User, LogOut, Settings, List } from 'lucide-react';
// import { useCart } from '@/context/CartContent';
// import CartModal from '../Modals/CartModal';
// import LoginRegister from '../Auth/LoginRegister';
// import LoginMsgModal from '../Auth/LoginMsgModal';
// import LogoutMsgModal from '../Auth/LogoutMsgModal';

// const UserCartIcons: React.FC = () => {
//   const { cart, cartVisible } = useCart();
//   const [cartModalOpen, setCartModalOpen] = useState(false);
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const [userInitials, setUserInitials] = useState<string | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showLoginMsg, setShowLoginMsg] = useState(false);
//   const [showLogoutMsg, setShowLogoutMsg] = useState(false);
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedUsername = localStorage.getItem('username');
//       if (storedUsername) {
//         setUserInitials(storedUsername.charAt(0).toUpperCase());
//         setUsername(storedUsername);
//       }
//     }
//   }, []);

//   const handleLoginSuccess = (username: string) => {
//     localStorage.setItem('username', username);
//     setUserInitials(username.charAt(0).toUpperCase());
//     setUsername(username);
//     setLoginModalOpen(false);
//     setShowLoginMsg(true);

//     setTimeout(() => {
//       setShowLoginMsg(false);
//     }, 3000);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('username');
//     setUserInitials(null);
//     setUsername(null);
//     setDropdownOpen(false);
//     setShowLogoutMsg(true);

//     setTimeout(() => {
//       setShowLogoutMsg(false);
//     }, 3000);
//   };

//   return (
//     <>
//       <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
//         {cartVisible && (
//           <div className="relative bg-white/40 p-2 rounded cursor-pointer" onClick={() => setCartModalOpen(true)}>
//             <ShoppingCart size={32} className="text-accent-deepCoffee" />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-accent-olive text-white text-xs font-bold px-2 py-1 rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </div>
//         )}

//         {/* User Icon / Initials */}
//         <div className="relative">
//           {/* When no user is logged in, clicking the UserIcon opens the login modal */}
//           {!userInitials ? (
//             <div className="bg-white/40 p-2 rounded cursor-pointer" onClick={() => setLoginModalOpen(true)}>
//               <User size={32} className="text-accent-deepCoffee" />
//             </div>
//           ) : (
//             // When user is logged in, clicking the Initials toggles the dropdown
//             <div className="bg-white/40 p-2 rounded cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
//               <div className="w-8 h-8 flex items-center justify-center bg-accent-softGreen text-white rounded-full text-lg font-bold">
//                 {userInitials}
//               </div>
//             </div>
//           )}

//           {/* Dropdown Menu (Only when clicking User Initials) */}
//           {userInitials && dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden">
//               <ul className="py-2 text-accent-deepCoffee">
//                 <li className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:bg-accent-softGreen hover:text-white">
//                   <List className="mr-2" size={18} /> Order History
//                 </li>
//                 <li className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:bg-accent-softGreen hover:text-white">
//                   <Settings className="mr-2" size={18} /> Settings
//                 </li>
//                 <li
//                   className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:bg-red-500 hover:text-white"
//                   onClick={handleLogout}
//                 >
//                   <LogOut className="mr-2" size={18} /> Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {cartModalOpen && <CartModal onClose={() => setCartModalOpen(false)} />}
//       {loginModalOpen && <LoginRegister onClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      
//       {showLoginMsg && username && <LoginMsgModal message={`Welcome to Coffee Hills, ${username}!`} onClose={() => setShowLoginMsg(false)} />}
//       {showLogoutMsg && <LogoutMsgModal message="Thank you for visiting Coffee Hills, see you again soon!" onClose={() => setShowLogoutMsg(false)} />}
//     </>
//   );
// };

// export default UserCartIcons;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ShoppingCart, User, LogOut, Settings, List } from 'lucide-react';
// import { useCart } from '@/context/CartContent';
// import CartModal from '../Modals/CartModal';
// import LoginRegister from '../Auth/LoginRegister';
// import LoginMsgModal from '../Auth/LoginMsgModal';
// import LogoutMsgModal from '../Auth/LogoutMsgModal';

// const UserCartIcons: React.FC = () => {
//   const { cart, cartVisible } = useCart();
//   const [cartModalOpen, setCartModalOpen] = useState(false);
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const [userInitials, setUserInitials] = useState<string | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showLoginMsg, setShowLoginMsg] = useState(false);
//   const [showLogoutMsg, setShowLogoutMsg] = useState(false);
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedUsername = localStorage.getItem('username');
//       if (storedUsername) {
//         setUserInitials(storedUsername.charAt(0).toUpperCase());
//         setUsername(storedUsername);
//       }
//     }
//   }, []);

//   const handleLoginSuccess = (username: string) => {
//     localStorage.setItem('username', username);
//     setUserInitials(username.charAt(0).toUpperCase());
//     setUsername(username);
//     setLoginModalOpen(false);
//     setShowLoginMsg(true);

//     // Hide LoginMsgModal after 3 seconds
//     setTimeout(() => {
//       setShowLoginMsg(false);
//     }, 3000);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('username');
//     setUserInitials(null);
//     setUsername(null);
//     setDropdownOpen(false);
//     setShowLogoutMsg(true);

//     // Hide LogoutMsgModal after 3 seconds
//     setTimeout(() => {
//       setShowLogoutMsg(false);
//     }, 3000);
//   };

//   return (
//     <>
//       <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
//         {cartVisible && (
//           <div className="relative bg-white/40 p-2 rounded cursor-pointer" onClick={() => setCartModalOpen(true)}>
//             <ShoppingCart size={32} className="text-accent-deepCoffee" />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-accent-olive text-white text-xs font-bold px-2 py-1 rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </div>
//         )}

//         {/* User Icon / Initials - Same UI Design for Placement */}
//         <div className="relative">
//           <div className="bg-white/40 p-2 rounded cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
//             {userInitials ? (
//               // User Initials (Opens Dropdown)
//               <div className="w-8 h-8 flex items-center justify-center bg-accent-softGreen text-white rounded-full text-lg font-bold">
//                 {userInitials}
//               </div>
//             ) : (
//               // Default User Icon (Opens Login Modal)
//               <User size={32} className="text-accent-deepCoffee" />
//             )}
//           </div>

//           {/* Dropdown Menu (Only when clicking User Initials) */}
//           {userInitials && dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden">
//               <ul className="py-2 text-accent-deepCoffee">
//                 <li className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:bg-accent-lightGray hover:text-accent-olive">
//                   <List className="mr-2" size={18} /> Order History
//                 </li>
//                 <li className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:bg-accent-lightGray hover:text-accent-olive">
//                   <Settings className="mr-2" size={18} /> Settings
//                 </li>
//                 <li
//                   className="px-4 py-2 cursor-pointer flex items-center transition duration-300 hover:bg-accent-lightGray hover:text-accent-olive"
//                   onClick={handleLogout}
//                 >
//                   <LogOut className="mr-2" size={18} /> Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {cartModalOpen && <CartModal onClose={() => setCartModalOpen(false)} />}
//       {loginModalOpen && <LoginRegister onClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      
//       {/* Show Login Message Modal */}
//       {showLoginMsg && username && <LoginMsgModal message={`Welcome to Coffee Hills, ${username}!`} onClose={() => setShowLoginMsg(false)} />}
      
//       {/* Show Logout Message Modal */}
//       {showLogoutMsg && <LogoutMsgModal message="Thank you for visiting Coffee Hills, see you again soon!" onClose={() => setShowLogoutMsg(false)} />}
//     </>
//   );
// };

// export default UserCartIcons;

