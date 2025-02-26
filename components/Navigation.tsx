// components/Navigation.tsx
import React from 'react';

type NavigationProps = {
  activeSection: string;
};

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Our Story' },
    { id: 'products', label: 'Products' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-24 left-4 bg-white/40 p-4 rounded shadow z-50">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`cursor-pointer ${
                activeSection === section.id
                  ? 'text-accent-deepCoffee font-bold'
                  : 'text-accent-brown'
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
