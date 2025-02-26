'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContent';
import CardButton from './CardButton';

type Product = {
  id: number;
  name: string;
  flavor: string;
  price: number;
  image: string;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center">
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden rounded-md bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          width={400} // Explicit width
          height={256} // Explicit height
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-2xl font-semibold text-center mt-4">{product.name}</h3>
      <p className="text-gray-600 text-center">Flavor Hint: {product.flavor}</p>
      <p className="text-lg font-bold text-accent-deepCoffee text-center">${product.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center mt-4">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 bg-gray-300 rounded">-</button>
        <span className="px-4">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-300 rounded">+</button>
      </div>

      {/* Add to Cart Button */}
      <div className="w-full mt-4">
        <CardButton onClick={() => addToCart({ ...product, quantity })} label="Add to Cart" />
      </div>
    </div>
  );
};

export default ProductCard;


// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { useCart } from '@/context/CartContent';
// import CardButton from './CardButton';

// type Product = {
//   id: number;
//   name: string;
//   flavor: string;
//   price: number;
//   image: string;
// };

// const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center">
//       {/* Next.js Image Component */}
//       <div className="relative w-full h-64 bg-gray-200">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={400}
//           height={256}
//           className="rounded-md"
//         />
//       </div>

//       <h3 className="text-2xl font-semibold text-center">{product.name}</h3>
//       <p className="text-gray-600 text-center">Flavor Hint: {product.flavor}</p>
//       <p className="text-lg font-bold text-accent-deepCoffee text-center">${product.price}</p>

//       {/* Quantity Selector */}
//       <div className="flex items-center mt-4">
//         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 bg-gray-300 rounded">-</button>
//         <span className="px-4">{quantity}</span>
//         <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-300 rounded">+</button>
//       </div>

//       {/* Add to Cart Button */}
//       <div className="w-full mt-4">
//         <CardButton onClick={() => addToCart({ ...product, quantity })} label="Add to Cart" />
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
