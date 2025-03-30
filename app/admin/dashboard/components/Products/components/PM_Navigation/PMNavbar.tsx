'use client';

import { useState } from "react";
import ProductItems from "../Module/ProductItems";
import ProductCategory from "../Module/ProductCategory";
import AddEditProductForm from "../Module/ProductItems";

const PMNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelection = (item: string) => {
    // If the selected item is clicked again, hide it
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="flex flex-col bg-gray-800 text-white w-full p-0 m-0">
      {/* Navbar */}
      <div className="flex items-center justify-start w-full p-2">
        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 px-4 py-2 bg-transparent text-white hover:text-gray-400 rounded-md"
          >
            <span className="text-sm">Menu</span>
            <span className={`transform ${dropdownOpen ? "rotate-180" : "rotate-0"} transition-transform`}>
              ▼
            </span>
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <div className="absolute left-0 mt-1 bg-gray-700 rounded-md shadow-lg w-48 z-10">
              <div className="py-2">
                <button
                  onClick={() => handleSelection("Category")}
                  className="block px-4 py-2 text-sm text-white hover:text-gray-400 w-full text-left transition-colors"
                >
                  Category
                </button>
                <button
                  onClick={() => handleSelection("Items")}
                  className="block px-4 py-2 text-sm text-white hover:text-gray-400 w-full text-left transition-colors"
                >
                  Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 text-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Render ProductCategory or ProductItems based on selection */}
        {selectedItem === "Category" && <ProductCategory />}
        {selectedItem === "Items" && <AddEditProductForm />}
      </div>
    </div>
  );
};

export default PMNavbar;






// 'use client';

// import { useState } from "react";
// import ProductItems from "../Module/ProductItems";
// import ProductCategory from "../Module/ProductCategory";

// const PMNavbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<string | null>(null);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleSelection = (item: string) => {
//     setSelectedItem(item);
//     setDropdownOpen(false); // Close dropdown after selection
//   };

//   return (
//     <div className="flex flex-col bg-gray-800 text-white w-full p-0 m-0">
      
//       {/* Navbar */}
//       <div className="flex items-center justify-start w-full p-2">
        
//         {/* Dropdown Menu */}
//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="flex items-center space-x-2 px-4 py-2 bg-transparent text-white hover:text-gray-400 rounded-md"
//           >
//             <span className="text-sm">Menu</span>
//             <span className={`transform ${dropdownOpen ? "rotate-180" : "rotate-0"} transition-transform`}>
//               ▼
//             </span>
//           </button>

//           {/* Dropdown Content */}
//           {dropdownOpen && (
//             <div className="absolute left-0 mt-1 bg-gray-700 rounded-md shadow-lg w-48 z-10">
//               <div className="py-2">
//                 <button
//                   onClick={() => handleSelection("Category")}
//                   className="block px-4 py-2 text-sm text-white hover:text-gray-400 w-full text-left transition-colors"
//                 >
//                   Category
//                 </button>
//                 <button
//                   onClick={() => handleSelection("Items")}
//                   className="block px-4 py-2 text-sm text-white hover:text-gray-400 w-full text-left transition-colors"
//                 >
//                   Items
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-grow p-4 text-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//         {/* Replaced the single quote with its HTML entity */}
//         {/* <p>Create your item's category</p> */}
//         {selectedItem === "Category" && <ProductCategory />}
//         {selectedItem === "Items" && <ProductItems />}
//       </div>
//     </div>
//   );
// };

// export default PMNavbar;



// 'use client';

// import { useState } from "react";
// import ProductItems from "../Module/ProductItems";
// import ProductCategory from "../Module/ProductCategory";

// const PMNavbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<string | null>(null);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleSelection = (item: string) => {
//     setSelectedItem(item);
//     setDropdownOpen(false); // Close dropdown after selection
//   };

//   return (
//     <div className="flex flex-col bg-gray-800 text-white w-full h-screen p-0 m-0">
      
//       {/* Navbar */}
//       <div className="flex items-center justify-start w-full p-2">
        
//         {/* Dropdown Menu */}
//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="flex items-center space-x-2 px-4 py-2 bg-transparent text-white hover:text-gray-400 rounded-md"
//           >
//             <span className="text-sm">Categories & Items</span>
//             <span className={`transform ${dropdownOpen ? "rotate-180" : "rotate-0"} transition-transform`}>
//               ▼
//             </span>
//           </button>

//           {/* Dropdown Content */}
//           {dropdownOpen && (
//             <div className="absolute left-0 mt-1 bg-gray-700 rounded-md shadow-lg w-48 z-10">
//               <div className="py-2">
//                 <button
//                   onClick={() => handleSelection("Category")}
//                   className="block px-4 py-2 text-sm text-white hover:text-gray-400 w-full text-left transition-colors"
//                 >
//                   Category
//                 </button>
//                 <button
//                   onClick={() => handleSelection("Items")}
//                   className="block px-4 py-2 text-sm text-white hover:text-gray-400 w-full text-left transition-colors"
//                 >
//                   Items
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-grow p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//         <h2 className="text-xl font-semibold">{selectedItem ? `${selectedItem} Section` : "Welcome"}</h2>
//         <p>{selectedItem ? `You selected ${selectedItem}` : "Please select a category or item."}</p>
//         {selectedItem === "Category" && <ProductCategory />}
//         {selectedItem === "Items" && <ProductItems />}
//       </div>
//     </div>
//   );
// };

// export default PMNavbar;



