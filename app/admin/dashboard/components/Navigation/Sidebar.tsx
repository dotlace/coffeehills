"use client";

import { useState, useEffect } from "react";
import { Home, Package, ClipboardList, BarChart, Settings, User } from "lucide-react";
import ThemeToggle from "../UI/ThemeToggle";
import DropDownMenu from "../UI/DropDownMenu";

const Sidebar = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSectionState] = useState("dashboard"); // Default to Home
  const [activeUser, setActiveUser] = useState(false); // Track active User icon

  useEffect(() => {
    setActiveSection(activeSection); // Ensure Home is the default active section on load
  }, [activeSection, setActiveSection]);

  const menuItems = [
    {
      label: "Home",
      section: "dashboard",
      icon: <Home size={22} />,
    },
    {
      label: "Product Management",
      section: "products",
      icon: <Package size={22} />,
      subItems: [
        {
          label: "Product Management",
          section: "productManagement",
        },
        {
          label: "Product Inventory",
          section: "productInventory",
        },
      ],
    },
    {
      label: "Order History",
      section: "orderHistory",
      icon: <ClipboardList size={22} />,
    },
    {
      label: "Analytics",
      section: "analytics",
      icon: <BarChart size={22} />,
    },
    {
      label: "Settings",
      section: "settings",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <aside className="h-screen w-16 bg-accent-beige dark:bg-gray-800 flex flex-col justify-between py-4 shadow-lg border-r border-gray-300 dark:border-gray-800 pt-20 relative">
      {/* Sidebar Menu Items */}
      <div className="flex flex-col items-center space-y-2">
        {menuItems.map((item) => {
          const isActive =
            activeSection === item.section || (item.subItems && activeDropdown === item.label);
          const isDropdownOpen = activeDropdown === item.label;

          return (
            <div
              key={item.section}
              className="relative w-full flex items-center justify-center"
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Clickable Icon */}
              <div
                onClick={() => {
                  if (item.subItems) {
                    setActiveDropdown(isDropdownOpen ? null : item.label);
                    setActiveSectionState(item.section); // ✅ Product Management turns white
                  } else {
                    setActiveSectionState(item.section);
                    setActiveDropdown(null);
                  }
                }}
                className={`relative flex items-center justify-center p-3 rounded-md transition-transform duration-200 cursor-pointer w-full ${
                  isActive
                    ? "text-white dark:text-gray-100" // Active icon brighter
                    : "text-gray-500 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-400" // Inactive icons dimmed
                } hover:scale-125`}
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
                  items={item.subItems.map((subItem) => ({
                    label: subItem.label,
                    onClick: () => {
                      setActiveSectionState(subItem.section);
                      setActiveDropdown(null);
                    },
                  }))}
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
          onClick={() => {
            setUserDropdownOpen(!userDropdownOpen);
            setActiveUser(!activeUser); // Toggle active user icon
          }}
          onMouseEnter={() => setHovered("User")}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className={`relative flex items-center justify-center p-3 rounded-md transition-colors duration-200 cursor-pointer w-full ${
              activeUser
                ? "text-white dark:text-gray-100" // ✅ Active User icon is white
                : "text-gray-500 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-400"
            } hover:scale-125`}
          >
            <User size={22} />
          </div>

          {/* Hover Label */}
          {hovered === "User" && (
            <span className="absolute left-20 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap shadow-lg">
              User
            </span>
          )}

          {/* Dropdown Menu for User */}
          {userDropdownOpen && (
            <DropDownMenu
              items={[{ label: "Logout", onClick: () => console.log("User logged out") }]}
              handleClose={() => {
                setUserDropdownOpen(false);
                setActiveUser(false); // Reset active state when closing
              }}
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


// "use client";

// import { useState, useEffect } from "react";
// import { Home, Package, ClipboardList, BarChart, Settings, User } from "lucide-react";
// import ThemeToggle from "../UI/ThemeToggle";
// import DropDownMenu from "../UI/DropDownMenu";

// const Sidebar = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
//   const [hovered, setHovered] = useState<string | null>(null);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [activeSection, setActiveSectionState] = useState("dashboard"); // Default to Home

//   useEffect(() => {
//     setActiveSection(activeSection); // Ensure Home is the default active section on load
//   }, [activeSection, setActiveSection]);

//   const menuItems = [
//     {
//       label: "Home",
//       section: "dashboard",
//       icon: <Home size={22} />,
//     },
//     {
//       label: "Product Management",
//       section: "products",
//       icon: <Package size={22} />,
//       subItems: [
//         {
//           label: "Product Management",
//           section: "productManagement",
//         },
//         {
//           label: "Product Inventory",
//           section: "productInventory",
//         },
//       ],
//     },
//     {
//       label: "Order History",
//       section: "orderHistory",
//       icon: <ClipboardList size={22} />,
//     },
//     {
//       label: "Analytics",
//       section: "analytics",
//       icon: <BarChart size={22} />,
//     },
//     {
//       label: "Settings",
//       section: "settings",
//       icon: <Settings size={22} />,
//     },
//   ];

//   return (
//     <aside className="h-screen w-16 bg-accent-beige dark:bg-gray-800 flex flex-col justify-between py-4 shadow-lg border-r border-gray-300 dark:border-gray-800 pt-20 relative">
//       {/* Sidebar Menu Items */}
//       <div className="flex flex-col items-center space-y-2">
//         {menuItems.map((item) => {
//           const isActive =
//             activeSection === item.section || (item.subItems && activeDropdown === item.label);
//           const isDropdownOpen = activeDropdown === item.label;

//           return (
//             <div
//               key={item.section}
//               className="relative w-full flex items-center justify-center"
//               onMouseEnter={() => setHovered(item.label)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               {/* Clickable Icon */}
//               <div
//                 onClick={() => {
//                   if (item.subItems) {
//                     setActiveDropdown(isDropdownOpen ? null : item.label);
//                     setActiveSectionState(item.section); // ✅ Ensure Product Management turns white
//                   } else {
//                     setActiveSectionState(item.section);
//                     setActiveDropdown(null);
//                   }
//                 }}
//                 className={`relative flex items-center justify-center p-3 rounded-md transition-transform duration-200 cursor-pointer w-full ${
//                   isActive
//                     ? "text-white dark:text-gray-100" // Active icon brighter
//                     : "text-gray-500 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-400" // Inactive icons dimmed
//                 } hover:scale-125`}
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
//                   items={item.subItems.map((subItem) => ({
//                     label: subItem.label,
//                     onClick: () => {
//                       setActiveSectionState(subItem.section);
//                       setActiveDropdown(null);
//                     },
//                   }))}
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
//               items={[{ label: "Logout", onClick: () => console.log("User logged out") }]}
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


