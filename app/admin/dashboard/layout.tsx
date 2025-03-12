'use client';

import Sidebar from './components/Navigation/Sidebar';


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Header - Now blends with the sidebar */}
      <header className="absolute top-0 left-0 w-full p-4 bg-accent-beige dark:bg-gray-800 flex justify-between items-center text-gray-900 dark:text-gray-100 
        before:absolute before:top-0 before:left-16 before:w-[calc(100%-4rem)] before:h-full before:border-b before:border-gray-300 dark:before:border-gray-800">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        
      </header>

      {/* Sidebar - Pushed down further using pt-20 */}
      <Sidebar />

      {/* Main Content (Dashboard) */}
      <div className="flex-1 flex flex-col pt-20">
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;


