'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

type NavigationProps = {
  activeSection: string;
};

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Our Story' },
    { id: 'products', label: 'Products' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white/60 rounded shadow md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        {isOpen ? <X size={28} className="text-accent-deepCoffee" /> : <Menu size={28} className="text-accent-deepCoffee" />}
      </button>

      {/* Navigation Menu */}
      <nav
        className={`fixed top-28 left-4 bg-white/40 p-4 rounded shadow z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block px-4 py-2 transition-colors ${
                  activeSection === section.id
                    ? 'text-accent-deepCoffee font-bold'
                    : 'text-accent-brown hover:text-accent-deepCoffee'
                }`}
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;


