'use client';

// Import the necessary components
import PMNavbar from "./components/PM_Navigation/PMNavbar";
import ProductCategoryView from "./components/Module/ProductCategoryView"; // Corrected import path

const ProductManagement = () => {
  return (
    <div className="flex flex-col">
      

      {/* Render ProductCategoryView immediately below PMNavbar */}
      <div>
        <PMNavbar />
        <ProductCategoryView />
        
      </div>
    </div>
  );
};

export default ProductManagement;




