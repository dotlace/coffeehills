'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Sustainability: React.FC = () => {
  return (
    <section 
      id="sustainability"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/sus1.jpeg')" }}
    >
      {/* Parallax Image Animation */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        whileInView={{ x: '0%', opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        viewport={{ once: false, amount: 0.2 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/sus1.jpeg')" }}
      />

      {/* Earthy Green Text Box */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        viewport={{ once: false, amount: 0.2 }}
        className="relative z-10 bg-accent-softGreen bg-opacity-40 p-8 rounded-lg max-w-2xl text-white text-center shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-4">Sustainability</h2>
        <p className="text-lg">
          At our coffee farm, sustainability is at the heart of everything we do. We focus on eco-friendly farming, 
          ensuring that every bean we grow contributes to a greener planet. Our commitment extends beyond coffee—we 
          actively support reforestation, soil health, and ethical sourcing to protect nature for future generations.
        </p>
      </motion.div>
    </section>
  );
};

export default Sustainability;
