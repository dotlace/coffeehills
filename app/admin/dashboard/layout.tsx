'use client';

import { useState } from "react";
import Sidebar from "./components/Navigation/Sidebar";
import ProductManagement from "./components/Products/ProductManagement";
import ProductInventory from "./components/Products/ProductInventory";
import OrderHistory from "./components/Products/OrderHistory";
import Analytics from "./components/Products/Analytics";
import Settings from "./components/Products/Setting";

const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  // Render content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case "productManagement":
        return <ProductManagement />;
      case "productInventory":
        return <ProductInventory />;
      case "orderHistory":
        return <OrderHistory />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <div>Welcome to the Admin Dashboard!</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      <Sidebar setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col">
        <header className="absolute top-0 left-16 w-[calc(100%-4rem)] p-4 bg-accent-beige dark:bg-gray-800 flex justify-between items-center text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-800">
          <h1>Admin Dashboard</h1>
        </header>

        <main className="flex-1 pt-20 p-6 overflow-auto">
          {renderContent()} {/* Render the content based on active section */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


