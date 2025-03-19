"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/lib/utils";
import { useCart } from "@/context/CartContent";
import CardButton from "../Buttons/CardButton";

interface ProductCardProps {
  product: Product;
  onViewMore: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewMore }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="bg-[#5C4033] shadow-lg p-5 rounded-xl flex flex-col items-center max-w-[300px] min-w-[280px]">
      {/* Image */}
      <div className="relative w-full h-40 overflow-hidden rounded-md">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={160}
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <h3 className="text-xl font-semibold text-center mt-4 text-[#D2B48C]">
        {product.name}
      </h3>
      {product.flavor && product.flavor !== "" && (
        <p className="text-sm text-gray-300 text-center">
          Flavor: {product.flavor}
        </p>
      )}
      <p className="text-lg font-bold text-[#F4E1C1] text-center">
        ${product.price.toFixed(2)}
      </p>

      {/* View More Button */}
      <p
        onClick={onViewMore}
        className="mt-3 text-[#e2c49c] text-sm cursor-pointer hover:text-[#F4E1C1] transition duration-300"
      >
        View More
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center mt-3 bg-[#D2B48C] p-2 rounded">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-1 bg-[#6D4C41] rounded text-white"
        >
          -
        </button>
        <span className="px-4 text-black">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 bg-[#6D4C41] rounded text-white"
        >
          +
        </button>
      </div>

      {/* Buttons */}
      <div className="w-full mt-4">
        <CardButton
          onClick={() =>
            addToCart({
              ...product,
              flavor: product.flavor ?? "", // Ensuring flavor is never undefined
              quantity,
            })
          }
          label="Add to Cart"
        />
      </div>
    </div>
  );
};

export default ProductCard;



// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { Product } from '@/lib/utils';
// import { useCart } from '@/context/CartContent';
// import CardButton from '../Buttons/CardButton';

// interface ProductCardProps {
//   product: Product;
//   onViewMore: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onViewMore }) => {
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = React.useState(1);

//   return (
//     <div className="bg-[#5C4033] shadow-lg p-5 rounded-xl flex flex-col items-center max-w-[300px] min-w-[280px]">
//       {/* Image */}
//       <div className="relative w-full h-40 overflow-hidden rounded-md">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={300}
//           height={160}
//           className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
//           loading="lazy"
//         />
//       </div>

//       {/* Product Details */}
//       <h3 className="text-xl font-semibold text-center mt-4 text-[#D2B48C]">{product.name}</h3>
//       <p className="text-sm text-gray-300 text-center">Flavor: {product.flavor}</p>
//       <p className="text-lg font-bold text-[#F4E1C1] text-center">${product.price}</p>

//       {/* View More Button */}
//       <p 
//         onClick={onViewMore} 
//         className="mt-3 text-[#e2c49c] text-sm cursor-pointer hover:text-[#F4E1C1] transition duration-300"
//       >
//         View More
//       </p>

//       {/* Quantity Selector */}
//       <div className="flex items-center mt-3 bg-[#D2B48C] p-2 rounded">
//         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 bg-[#6D4C41] rounded text-white">-</button>
//         <span className="px-4 text-black">{quantity}</span>
//         <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-[#6D4C41] rounded text-white">+</button>
//       </div>

//       {/* Buttons */}
//       <div className="w-full mt-4">
//         <CardButton onClick={() => addToCart({ ...product, quantity })} label="Add to Cart" />
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { useCart } from '@/context/CartContent';
// import CardButton from '../Buttons/CardButton';

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
//       {/* Image Container */}
//       <div className="relative w-full h-64 overflow-hidden rounded-md bg-gray-200">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={400} // Explicit width
//           height={256} // Explicit height
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <h3 className="text-2xl font-semibold text-center mt-4">{product.name}</h3>
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
