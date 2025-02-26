'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Arabica Beans', flavor: 'Nutty & Caramel', price: 15, image: '/images/cpk1.jpeg' },
  { id: 2, name: 'Robusta Beans', flavor: 'Bold & Chocolaty', price: 12, image: '/images/cpk2.jpeg' },
  { id: 3, name: 'Honey Processed Coffee', flavor: 'Sweet & Fruity', price: 18, image: '/images/cpk3.jpeg' },
  { id: 4, name: 'Espresso Blend', flavor: 'Rich & Smooth', price: 20, image: '/images/cpk4.jpeg' },
];

const Products: React.FC = () => {
  return (
    <motion.section 
      id="products"
      className="min-h-screen p-8"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <h2 className="text-4xl font-bold text-center mb-8 text-accent-beige">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
};

export default Products;


// 'use client';

// import React from 'react';
// import ProductCard from './ProductCard';

// const products = [
//   { id: 1, name: 'Arabica Beans', flavor: 'Nutty & Caramel', price: 15, image: '/images/cpk1.jpeg' },
//   { id: 2, name: 'Robusta Beans', flavor: 'Bold & Chocolaty', price: 12, image: '/images/cpk2.jpeg' },
//   { id: 3, name: 'Honey Processed Coffee', flavor: 'Sweet & Fruity', price: 18, image: '/images/cpk3.jpeg' },
//   { id: 4, name: 'Espresso Blend', flavor: 'Rich & Smooth', price: 20, image: '/images/cpk4.jpeg' },
// ];

// const Products: React.FC = () => {
//   console.log("✅ Rendering Products.tsx with correct product list:", products);

//   return (
//     <section id="products" className="min-h-screen p-8">
//       <h2 className="text-4xl font-bold text-center mb-8 text-accent-beige">Our Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Products;
