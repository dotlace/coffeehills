'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Sustainability from '@/components/Sustainability';
import Contact from '@/components/Contact';

const sections = ['home', 'about', 'products', 'sustainability', 'contact'];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll to Hero section on first render
  useEffect(() => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'instant' }); // Use "smooth" for animation
    }
  }, []);

  useEffect(() => {
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
      <Navigation activeSection={activeSection} />
      <Hero />
      <About />
      <Products />
      <Sustainability />
      <Contact />
    </div>
  );
}

