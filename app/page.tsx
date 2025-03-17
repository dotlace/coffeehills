'use client';

import React, { useLayoutEffect, useState } from 'react';
import Navigation from './(website)/components/Layout/Navigation';
import Hero from './(website)/components/Pages/Hero';
import About from './(website)/components/Pages/About';
import Products from './(website)/components/Pages/Products';
import Sustainability from './(website)/components/Pages/Sustainability';
import Contact from './(website)/components/Pages/Contact';
import UserCartIcons from './(website)/components/Cart/UserCartIcon';
import Logo from './(website)/components/Layout/Logo';


const sections = ['home', 'about', 'products', 'sustainability', 'contact'];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');

  useLayoutEffect(() => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      let current = activeSection;
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = sectionId;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div>
      {/* Move client-side components inside `page.tsx` */}
      <Logo />
      <UserCartIcons />
      <Navigation activeSection={activeSection} />
      <Hero />
      <About />
      <Products />
      <Sustainability />
      <Contact />
    </div>
  );
}


