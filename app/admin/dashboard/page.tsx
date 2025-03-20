'use client';

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProductManagement from "./components/Products/ProductManagement";

const AdminDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (!userData || userData.role !== "admin") {
      router.push("/");
    } else {
      setUserRole(userData.role);
    }
  }, [router]);

  return (
    <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Show Product Management when on the correct path */}
      {pathname === "/admin/dashboard/products/cards" ? (
        <ProductManagement />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            You are currently in <strong>/admin/dashboard</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Your Role: <strong>{userRole || "Loading..."}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;




