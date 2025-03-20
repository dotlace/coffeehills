'use client';

import { useState, useEffect } from "react";
import Loading from "@/app/(website)/components/UI/Loading";


// Define a type for category
interface Category {
  id: number;
  name: string;
  itemsCount: number;
}

const ProductCategoryView = () => {
  const [categories, setCategories] = useState<Category[]>([]);  // Use the Category type here
  const [loading, setLoading] = useState(true);  // Loading state
  const [categoryName, setCategoryName] = useState("");  // Input field for category name

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();  // Ensure data is typed as Category[]

        // Set the fetched categories data
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched
      }
    };

    fetchCategories();
  }, []);

  // Handle category creation
  const handleCategoryCreation = () => {
    const newCategory: Category = {
      id: categories.length + 1,  // Auto-increment or set it dynamically
      name: categoryName,
      itemsCount: 0,  // Initially 0 items
    };

    setCategories([...categories, newCategory]);  // Add the new category to the list
    setCategoryName("");  // Clear the input field
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#D2B48C]">Categories</h2>

      {/* Category creation form */}
      <div className="mb-4 flex justify-center items-center space-x-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-white w-1/3"  // Ensuring consistent width
        />
        <button
          onClick={handleCategoryCreation}
          className="px-6 py-2 bg-accent-darkGreen dark:bg-gray-800 text-white rounded-md"
        >
          Save
        </button>
      </div>

      {/* Show loading spinner if the data is still loading */}
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <Loading /> {/* Render Loading component */}
        </div>
      ) : (
        // Categories table
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Category Name</th>
                <th className="px-6 py-3 text-left">Number of Items</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 dark:text-gray-100">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-3 text-center text-gray-500">
                    No categories available
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr key={category.id} className="border-b hover:bg-gray-200 dark:hover:bg-gray-600">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{category.name}</td>
                    <td className="px-6 py-3">{category.itemsCount || 0}</td> {/* Display number of items */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductCategoryView;



// 'use client';

// import { useState, useEffect } from "react";

// // Define a type for category
// interface Category {
//   id: number;
//   name: string;
//   itemsCount: number;
// }

// const ProductCategoryView = () => {
//   const [categories, setCategories] = useState<Category[]>([]);  // Use the Category type here
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [categoryName, setCategoryName] = useState("");  // Input field for category name

//   // Fetch categories from the backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Replace with your actual API endpoint for categories
//         const response = await fetch("/api/categories");

//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const data: Category[] = await response.json();  // Ensure data is typed as Category[]

//         // Set the fetched categories data
//         setCategories(data);  // Now we use setCategories to update the state
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);  // Set loading to false once the data is fetched
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Show loading message if data is being fetched
//   if (loading) return <p className="text-center text-lg">Loading categories...</p>;

//   // Handle the category creation form submission
//   const handleCategoryCreation = () => {
//     // Replace with actual logic to create a category via API
//     const newCategory: Category = {
//       id: categories.length + 1, // Auto-increment or set it dynamically
//       name: categoryName,
//       itemsCount: 0, // Initially 0 items
//     };

//     setCategories([...categories, newCategory]);  // Add the new category to the list
//     setCategoryName("");  // Clear the input field
//   };

//   return (
//     <div className="p-6 bg-gray-100 dark:bg-gray-800 text-white">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-[#D2B48C]">Categories</h2>

//       {/* Category creation form */}
//       <div className="mb-4 flex justify-center items-center space-x-4">
//         <input
//           type="text"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           placeholder="Category Name"
//           className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-white w-1/3"  // Ensuring consistent width
//         />
//         <button
//           onClick={handleCategoryCreation}
//           className="px-6 py-2 bg-accent-darkGreen dark:bg-gray-800 text-white rounded-md"
//         >
//           Save
//         </button>
//       </div>

//       {/* Categories table */}
//       <div className="overflow-x-auto mt-4">
//         <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-700 rounded-lg shadow-lg">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left">No</th>
//               <th className="px-6 py-3 text-left">Category Name</th>
//               <th className="px-6 py-3 text-left">Number of Items</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-900 dark:text-gray-100">
//             {categories.map((category, index) => (
//               <tr key={category.id} className="border-b hover:bg-gray-200 dark:hover:bg-gray-600">
//                 <td className="px-6 py-3">{index + 1}</td>
//                 <td className="px-6 py-3">{category.name}</td>
//                 <td className="px-6 py-3">{category.itemsCount || 0}</td> {/* Display number of items */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductCategoryView;


// 'use client';

// import { useState, useEffect } from "react";

// // Define a type for category
// interface Category {
//   id: number;
//   name: string;
//   itemsCount: number;
// }

// const ProductCategoryView = () => {
//   const [categories, setCategories] = useState<Category[]>([]);  // Use the Category type here
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [categoryName, setCategoryName] = useState("");  // Input field for category name

//   // Fetch categories from the backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Replace with your actual API endpoint for categories
//         const response = await fetch("/api/categories");

//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const data: Category[] = await response.json();  // Ensure data is typed as Category[]

//         // Set the fetched categories data
//         setCategories(data);  // Now we use setCategories to update the state
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);  // Set loading to false once the data is fetched
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Show loading message if data is being fetched
//   if (loading) return <p className="text-center text-lg">Loading categories...</p>;

//   // Handle the category creation form submission
//   const handleCategoryCreation = () => {
//     // Replace with actual logic to create a category via API
//     const newCategory: Category = {
//       id: categories.length + 1, // Auto-increment or set it dynamically
//       name: categoryName,
//       itemsCount: 0, // Initially 0 items
//     };

//     setCategories([...categories, newCategory]);  // Add the new category to the list
//     setCategoryName("");  // Clear the input field
//   };

//   return (
//     <div className="p-6 bg-gray-100 dark:bg-gray-800 text-white">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-[#D2B48C]">Categories</h2>

//       {/* Category creation form */}
//       <div className="mb-8">
//         <div className="flex justify-center space-x-4 mb-4">
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             placeholder="Category Name"
//             className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-white"
//           />
//           <button
//             onClick={handleCategoryCreation}
//             className="px-6 py-2 bg-accent-darkGreen dark:bg-gray-800 text-white rounded-md"
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Categories table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-700 rounded-lg shadow-lg">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left">No</th>
//               <th className="px-6 py-3 text-left">Category Name</th>
//               <th className="px-6 py-3 text-left">Number of Items</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-900 dark:text-gray-100">
//             {categories.map((category, index) => (
//               <tr key={category.id} className="border-b hover:bg-gray-200 dark:hover:bg-gray-600">
//                 <td className="px-6 py-3">{index + 1}</td>
//                 <td className="px-6 py-3">{category.name}</td>
//                 <td className="px-6 py-3">{category.itemsCount || 0}</td> {/* Display number of items */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductCategoryView;



