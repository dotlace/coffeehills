import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaSave, FaPlus } from "react-icons/fa";

// Define the type for Category
interface Category {
  id: string;
  name: string;
  products: Array<any>; // Adjust this type to match your data structure for products
}

const ProductCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Explicitly type categories
  const [editingId, setEditingId] = useState<string | null>(null); // Store the id of the category being edited
  const [categoryName, setCategoryName] = useState("");
  const [originalCategoryName, setOriginalCategoryName] = useState(""); // To track the original name
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [isAddingCategory, setIsAddingCategory] = useState(false); // To track if the "Add Category" form is being shown

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/product/productCategory");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
    setOriginalCategoryName(category.name); // Store the original name for comparison
  };

  const handleSave = async (id: string) => {
    try {
      const response = await fetch(`/api/product/productCategory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) throw new Error("Failed to update category");

      await fetchCategories();
      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/product/productCategory/${categoryToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      await fetchCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch("/api/product/productCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) throw new Error("Failed to add category");

      setCategoryName(""); // Clear the input after saving
      setIsAddingCategory(false); // Close the input field
      await fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm)
  );

  // Check if save button should be enabled (if category name has changed)
  const isSaveEnabled = categoryName !== originalCategoryName && categoryName.trim() !== "";

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Product Categories</h2>

      {/* Add Category Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Categories"
          value={searchTerm}
          onChange={handleSearch}
          className="border px-2 py-1 w-1/3 bg-gray-200 text-black dark:bg-gray-600 dark:text-white rounded"
        />
        <button
          onClick={() => setIsAddingCategory(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Add New Category Form */}
      {isAddingCategory && (
        <div className="mb-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter new category name"
            className="border px-2 py-1 w-full bg-gray-200 text-black dark:bg-gray-600 dark:text-white rounded mb-2"
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Category
          </button>
        </div>
      )}

      <table className="w-full border-collapse mt-4 dark:bg-gray-800 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Number of Products</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => editingId !== category.id && handleEdit(category)} // Enable row switching
            >
              <td className="border p-2">
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border px-2 py-1 w-full bg-gray-200 text-black dark:bg-gray-600 dark:text-white rounded"
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="border p-2">{category.products.length}</td>
              <td className="border p-2 flex justify-end items-center space-x-2">
                {editingId === category.id ? (
                  <>
                    <button
                      onClick={() => handleSave(category.id)}
                      className={`${
                        isSaveEnabled ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
                      } text-white px-4 py-2 rounded`}
                      disabled={!isSaveEnabled} // Disable save button if no changes
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md dark:bg-gray-800 dark:text-white">
            <p>Are you sure you want to delete this category?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;









// import { useState } from 'react';
// import { SaveButton } from '../../../UI/Button'; // Correct import for SaveButton

// const ProductCategory = () => {
//   const [categoryName, setCategoryName] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCategoryName(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (isSubmitting || !categoryName.trim()) return;

//     setIsSubmitting(true);

//     try {
//       // Call the specific API endpoint based on your project structure
//       const response = await fetch('/api/product/productCategory', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: categoryName }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create category');
//       }

//       const newCategory = await response.json();
//       setCategoryName('');
//       alert(`Category "${newCategory.name}" created successfully!`);
//     } catch (error) {
//       console.error(error);
//       alert('Error creating category.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-start pt-4"> {/* Reduced padding-top to move closer to top */}
//       <form onSubmit={handleSubmit} className="flex items-center space-x-4">
//         {/* Category Name Label */}
//         <div>
//           <label htmlFor="categoryName" className="block text-sm">Category Name</label>
//         </div>
//         {/* Category Input Field */}
//         <div>
//           <input
//             type="text"
//             id="categoryName"
//             value={categoryName}
//             onChange={handleInputChange}
//             className="px-4 py-2 border border-gray-300 rounded-md w-96 bg-accent-stone" 
//           />
//         </div>
//         {/* Save Button */}
//         <div>
//           <SaveButton />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductCategory;

