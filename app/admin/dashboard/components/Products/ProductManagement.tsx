'use client';

// Import the necessary components
import PMNavbar from "./components/PM_Navigation/PMNavbar";
import ProductCategoryView from "./components/Module/ProductCategoryView"; // Corrected import path

const ProductManagement = () => {
  return (
    <div className="flex flex-col">
      <PMNavbar /> {/* PMNavbar stays at the top */}

      {/* Render ProductCategoryView below PMNavbar */}
      <div className="mt-8"> {/* Add margin-top to separate from the navbar */}
        <ProductCategoryView />
      </div>
    </div>
  );
};

export default ProductManagement;




