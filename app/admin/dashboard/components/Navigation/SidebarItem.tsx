'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isExpanded: boolean;
}

const SidebarItem = ({ icon, label, path, isExpanded }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === path || (path !== '/' && pathname.startsWith(`${path}/`));

  return (
    <Link href={path}>
      <div
        className={`flex items-center gap-3 p-2 rounded-md transition-transform duration-200 ${
          isActive
            ? 'text-gray-100 dark:text-white'  // Always bright
            : 'text-gray-500 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-400'  // Dimmed inactive
        } hover:scale-125`}
        
      
        
        
      >
        {icon}
        {isExpanded && <span>{label}</span>}
      </div>
    </Link>
  );
};

export default SidebarItem;

// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   path: string;
//   isExpanded: boolean;
// }

// const SidebarItem = ({ icon, label, path, isExpanded }: SidebarItemProps) => {
//   const pathname = usePathname();
//   const isActive =
//     pathname === path || (path !== '/' && pathname.startsWith(`${path}/`));

//   return (
//     <Link href={path}>
//       <div
//         className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 ${
//           isActive
//             ? 'bg-accent-softgreen text-gray-900 dark:text-gray-100'
//             : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
//         }`}
//       >
//         {icon}
//         {isExpanded && <span>{label}</span>}
//       </div>
//     </Link>
//   );
// };

// export default SidebarItem;


