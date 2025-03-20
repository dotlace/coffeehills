"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface DropDownMenuProps {
  items: { label: string; path?: string; onClick?: () => void }[];
  handleClose?: () => void; 
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ items, handleClose }) => {
  const router = useRouter();

  return (
    <div className="absolute left-full mt-2 bg-white shadow-md rounded-md p-2 w-48 dark:bg-gray-800">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            if (item.path) router.push(item.path); // Navigate to the route
            if (item.onClick) item.onClick();
            if (handleClose) handleClose(); // Close dropdown after clicking an item
          }}
          className="block w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 text-xs transition-all duration-200 hover:text-accent-olive dark:hover:text-accent-softGreen hover:scale-105"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default DropDownMenu;

