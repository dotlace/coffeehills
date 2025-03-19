



// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import {
//   Home,
//   Package,
//   ClipboardList,
//   BarChart,
//   Settings,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import ThemeToggle from "../UI/ThemeToggle";
// import DropDownMenu from "../UI/DropDownMenu";

// const Sidebar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [hovered, setHovered] = useState<string | null>(null);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);

//   const menuItems = [
//     { label: "Home", path: "/admin/dashboard", icon: <Home size={22} /> },
//     {
//       label: "Product Management",
//       path: "/admin/dashboard/products",
//       icon: <Package size={22} />,
//       subItems: [
//         { label: "Product Managements", path: "/admin/dashboard/products" }, // Updated name
//         { label: "Product Inventory", path: "/admin/dashboard/products/inventory" },
//       ],
//     },
//     { label: "Order History", path: "/admin/dashboard/orders", icon: <ClipboardList size={22} /> },
//     { label: "Analytics", path: "/admin/dashboard/analytics", icon: <BarChart size={22} /> },
//     { label: "Settings", path: "/admin/dashboard/settings", icon: <Settings size={22} /> },
//   ];

//   const handleLogout = () => {
//     console.log("User logged out"); // Replace with actual logout logic
//   };

//   return (
//     <aside className="h-screen w-16 bg-accent-beige dark:bg-gray-800 flex flex-col justify-between py-4 shadow-lg border-r border-gray-300 dark:border-gray-800 pt-20 relative">
//       {/* Sidebar Menu Items */}
//       <div className="flex flex-col items-center space-y-2">
//         {menuItems.map((item) => {
//           const isActive =
//             pathname === item.path || (item.path !== "/" && pathname.startsWith(`${item.path}/`));
//           const isDropdownOpen = activeDropdown === item.label;

//           return (
//             <div
//               key={item.path}
//               className="relative w-full flex items-center justify-center"
//               onMouseEnter={() => !isDropdownOpen && setHovered(item.label)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               {/* Clickable Icon */}
//               <div
//                 onClick={() => {
//                   if (item.path) {
//                     router.push(item.path); // Navigate when clicking
//                   }
//                   setActiveDropdown(isDropdownOpen ? null : item.label);
//                 }}
//                 className={`relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 cursor-pointer w-full
//                   ${isActive ? "bg-accent-softGreen text-white" : "text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen"}`}
//               >
//                 {item.icon}
//               </div>

//               {/* Hover Label */}
//               {hovered === item.label && !isDropdownOpen && (
//                 <span className="absolute left-20 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap shadow-lg">
//                   {item.label}
//                 </span>
//               )}

//               {/* Dropdown Menu */}
//               {item.subItems && isDropdownOpen && (
//                 <DropDownMenu
//                   items={item.subItems}
//                   handleClose={() => setActiveDropdown(null)}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Bottom Section - User Menu & Theme Toggle */}
//       <div className="flex flex-col items-center space-y-2 pb-4 bg-accent-beige dark:bg-gray-800 relative">
//         {/* User Menu */}
//         <div
//           className="relative w-full flex items-center justify-center"
//           onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//         >
//           <div className="relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 cursor-pointer w-full text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen">
//             <User size={22} />
//           </div>

//           {/* Dropdown Menu for User */}
//           {userDropdownOpen && (
//             <DropDownMenu
//               items={[{ label: "Logout", onClick: handleLogout }]}
//               handleClose={() => setUserDropdownOpen(false)}
//             />
//           )}
//         </div>

//         {/* Theme Toggle */}
//         <div className="p-3">
//           <ThemeToggle />
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ClipboardList,
  BarChart,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../UI/ThemeToggle";
import DropDownMenu from "../UI/DropDownMenu";

const Sidebar = () => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/admin/dashboard", icon: <Home size={22} /> },
    {
      label: "Product Management",
      path: "/admin/dashboard/products",
      icon: <Package size={22} />,
      subItems: [
        { label: "Product Cards Control", path: "/admin/dashboard/products/cards" },
        { label: "Product Inventory", path: "/admin/dashboard/products/inventory" },
      ],
    },
    { label: "Order History", path: "/admin/dashboard/orders", icon: <ClipboardList size={22} /> },
    { label: "Analytics", path: "/admin/dashboard/analytics", icon: <BarChart size={22} /> },
    { label: "Settings", path: "/admin/dashboard/settings", icon: <Settings size={22} /> },
  ];

  const handleLogout = () => {
    console.log("User logged out"); // Replace with actual logout logic
  };

  return (
    <aside className="h-screen w-16 bg-accent-beige dark:bg-gray-800 flex flex-col justify-between py-4 shadow-lg border-r border-gray-300 dark:border-gray-800 pt-20 relative">
      {/* Sidebar Menu Items */}
      <div className="flex flex-col items-center space-y-2">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path || (item.path !== "/" && pathname.startsWith(`${item.path}/`));
          const isDropdownOpen = activeDropdown === item.label;

          return (
            <div
              key={item.path}
              className="relative w-full flex items-center justify-center"
              onMouseEnter={() => !isDropdownOpen && setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Clickable Icon */}
              <div
                onClick={() => setActiveDropdown(isDropdownOpen ? null : item.label)}
                className={`relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 cursor-pointer w-full
                  ${isActive ? "bg-accent-softGreen text-white" : "text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen"}`}
              >
                {item.icon}
              </div>

              {/* Hover Label */}
              {hovered === item.label && !isDropdownOpen && (
                <span className="absolute left-20 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap shadow-lg">
                  {item.label}
                </span>
              )}

              {/* Dropdown Menu */}
              {item.subItems && isDropdownOpen && (
                <DropDownMenu
                  items={item.subItems}
                  handleClose={() => setActiveDropdown(null)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Section - User Menu & Theme Toggle */}
      <div className="flex flex-col items-center space-y-2 pb-4 bg-accent-beige dark:bg-gray-800 relative">
        {/* User Menu */}
        <div
          className="relative w-full flex items-center justify-center"
          onClick={() => setUserDropdownOpen(!userDropdownOpen)}
        >
          <div className="relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 cursor-pointer w-full text-gray-900 dark:text-gray-100 hover:bg-accent-olive dark:hover:bg-accent-softGreen">
            <User size={22} />
          </div>

          {/* Dropdown Menu for User */}
          {userDropdownOpen && (
            <DropDownMenu
              items={[{ label: "Logout", onClick: handleLogout }]}
              handleClose={() => setUserDropdownOpen(false)}
            />
          )}
        </div>

        {/* Theme Toggle */}
        <div className="p-3">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;



