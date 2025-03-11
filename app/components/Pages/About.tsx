// components/About.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center">

      {/* First Text Block – Our Story */}
      <div className="max-w-3xl text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative z-10 bg-accent-olive bg-opacity-20 shadow-lg p-8 rounded-lg max-w-2xl text-accent-beige text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-accent-softGreen">Our Story</h2>
          <p className="text-lg">
              Located in the serene hills of Pyin Oo Lwin at over 3,000 feet, our family-owned coffee farm thrives in Myanmar&apos;s Shan highlands. With rich soil and an ideal climate, we grow exceptional coffee, with Arabica beans standing out for their smooth, nuanced flavor. Blending tradition with modern techniques, we produce premium, sustainable coffee that reflects our heritage and passion.
          </p>
        </motion.div>
      </div>

      {/* First Parallax Image */}
      <div
        className="w-full h-96 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/farmer-from-under.jpeg')" }}
      ></div>

      {/* Second Text Block – Sustainability Approach */}
      <div className="max-w-3xl text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative z-10 bg-accent-olive bg-opacity-40 shadow-lg p-8 rounded-lg max-w-2xl text-accent-beige text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-accent-softGreen">Our Bean</h2>
          <p className="text-lg">
            At our farm, we believe in a sustainable approach to coffee cultivation. We take great care in using earth-friendly methods that ensure our practices leave a minimal carbon footprint. From planting to harvesting, we are dedicated to not just producing the finest coffee, but also to preserving the environment that makes it all possible.
          </p>
        </motion.div>
      </div>

      {/* Second Parallax Image */}
      <div
        className="w-full h-96 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/coffee-harvesting.jpeg')" }}
      ></div>

      {/* Third Text Block – Organic Commitment */}
      <div className="max-w-3xl text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative z-10 bg-accent-olive bg-opacity-40 shadow-lg p-8 rounded-lg max-w-2xl text-accent-beige text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-accent-softGreen">Organic Commitment</h2>
          <p className="text-lg">
            Our beans are carefully nurtured in high-altitude fields, benefiting from optimal climate and soil conditions that yield a rich, distinctive flavor profile admired around the world.
          </p>
        </motion.div>
      </div>

      {/* Third Parallax Image */}
      <div
        className="w-full h-96 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/coffee-harvesting.jpeg')" }}
      ></div>
    </section>
  );
};

export default About;
