"use client";

import { useState } from "react";

const ProductManagement = () => {
  const [selectedAction, setSelectedAction] = useState<"add" | "edit" | "remove" | "view">("add");

  return (
    <div className="flex h-full w-full bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md">
      {/* Left Section - Sidebar Buttons */}
      <div className="w-1/5 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Management</h2>
        <div className="flex flex-col space-y-2">
          <button
            className={`p-2 rounded-md text-sm transition-all duration-200 ${
              selectedAction === "add"
                ? "bg-accent-olive text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setSelectedAction("add")}
          >
            Add Product
          </button>
          <button
            className={`p-2 rounded-md text-sm transition-all duration-200 ${
              selectedAction === "edit"
                ? "bg-accent-olive text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setSelectedAction("edit")}
          >
            Edit Products
          </button>
          <button
            className={`p-2 rounded-md text-sm transition-all duration-200 ${
              selectedAction === "remove"
                ? "bg-accent-olive text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setSelectedAction("remove")}
          >
            Remove Product
          </button>
          <button
            className={`p-2 rounded-md text-sm transition-all duration-200 ${
              selectedAction === "view"
                ? "bg-accent-olive text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setSelectedAction("view")}
          >
            View Products
          </button>
        </div>
      </div>

      {/* Right Section - Dynamic Forms */}
      <div className="w-4/5 bg-white dark:bg-gray-800 p-6 ml-6 rounded-lg shadow-md">
        {selectedAction === "add" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Product</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                placeholder="Product Description"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
              <button className="p-2 bg-accent-olive text-white rounded-md hover:bg-accent-softGreen">
                Add Product
              </button>
            </form>
          </div>
        )}

        {selectedAction === "edit" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Products</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Search Product by Name"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="New Product Name"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="New Price"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button className="p-2 bg-accent-olive text-white rounded-md hover:bg-accent-softGreen">
                Update Product
              </button>
            </form>
          </div>
        )}

        {selectedAction === "remove" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Remove Product</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Search Product by Name"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete Product
              </button>
            </form>
          </div>
        )}

        {selectedAction === "view" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">View Products</h2>
            <p className="text-gray-600 dark:text-gray-300">Product list will be displayed here...</p>
            {/* This can later be replaced with a product table or grid */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;

