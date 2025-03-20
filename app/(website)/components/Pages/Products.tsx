"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContent";
import ProductCard from "../Product/ProductCard";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  flavor?: string;
  image: string;
  createdAt: string;
}

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product/productCard");
  
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
  
        const data: Product[] = await response.json();
  
        // Check if the data is valid
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
  
        setProducts(
          data.map((product) => ({
            ...product,
            flavor: product.flavor ?? "",
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  const cardsPerPage = 4;
  const totalPages = Math.ceil(products.length / cardsPerPage);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      let newIndex = activeIndex;

      if (direction === "left") {
        newIndex = Math.max(0, activeIndex - 1);
      } else if (direction === "right") {
        newIndex = Math.min(totalPages - 1, activeIndex + 1);
      }

      setActiveIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateActiveIndex = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateActiveIndex);
      return () => scrollElement.removeEventListener("scroll", updateActiveIndex);
    }
  }, []);

  if (loading) return <p className="text-center text-lg">Loading products...</p>;

  return (
    <section id="products" className="relative p-8 bg-[#3B2F2F] text-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#D2B48C]">Our Coffee Selection</h2>

      <div className="relative w-full max-w-7xl mx-auto px-8">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#5C4033] p-4 rounded-full shadow-md hover:bg-[#8B5E3C] transition z-10"
          disabled={activeIndex === 0}
          style={{ opacity: activeIndex === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft size={30} className="text-white" />
        </button>

        {/* Product List */}
        <div className="relative overflow-hidden w-full">
          <div
            ref={scrollRef}
            className="flex w-full overflow-x-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => {
              const pageProducts = products.slice(
                pageIndex * cardsPerPage,
                (pageIndex + 1) * cardsPerPage
              );

              // Calculate the number of columns based on product count
              const getGridClass = (count: number) => {
                if (count === 1) return "grid-cols-1";
                if (count === 2) return "grid-cols-1 md:grid-cols-2";
                if (count === 3) return "grid-cols-1 md:grid-cols-3";
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
              };

              return (
                <div
                  key={pageIndex}
                  className="flex-shrink-0 w-full snap-center"
                >
                  <div 
                    className={`grid gap-8 mx-auto ${getGridClass(pageProducts.length)} place-items-center justify-center`}
                    style={{
                      maxWidth: pageProducts.length < 4 
                        ? pageProducts.length === 3 
                          ? "900px" 
                          : pageProducts.length === 2 
                            ? "600px" 
                            : "300px"
                        : "none"
                    }}
                  >
                    {pageProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onViewMore={() => {
                          setSelectedProduct(product);
                          setQuantity(1);
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#5C4033] p-4 rounded-full shadow-md hover:bg-[#8B5E3C] transition z-10"
          disabled={activeIndex === totalPages - 1}
          style={{ opacity: activeIndex === totalPages - 1 ? 0.5 : 1 }}
        >
          <ChevronRight size={30} className="text-white" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center mt-8 space-x-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              scrollRef.current?.scrollTo({
                left: index * scrollRef.current.clientWidth,
                behavior: "smooth",
              });
            }}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-[#D2B48C] w-6" : "bg-gray-500"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Product Details Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-amber-100 p-6 rounded-lg max-w-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={400}
              height={250}
              className="w-full h-60 object-cover rounded-md mb-4"
            />

            <h2 className="text-xl font-bold text-[#5C4033]">{selectedProduct.name}</h2>
            <p className="text-gray-600">{selectedProduct.description}</p>
            <p className="text-lg flex justify-center font-bold text-[#634a20] mt-2">${selectedProduct.price}</p>

            <div className="flex justify-center items-center mt-4 bg-[#D2B48C] p-2 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-[#6D4C41] rounded text-white"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 text-black">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 bg-[#6D4C41] rounded text-white"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                addToCart({
                  ...selectedProduct,
                  quantity,
                });
                setSelectedProduct(null);
              }}
              className="mt-4 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;


// import React, { useRef, useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Product } from '@/lib/utils';
// import ProductCard from '../Product/ProductCard';
// import Image from 'next/image';
// import { useCart } from '@/context/CartContent';

// const products: Product[] = [
//   { id: 1, name: 'Arabica Beans', flavor: 'Nutty & Caramel', price: 15, image: '/images/cpk1.jpeg', description: 'Smooth and balanced with caramel and nutty notes.' },
//   { id: 2, name: 'Robusta Beans', flavor: 'Bold & Chocolaty', price: 12, image: '/images/cpk2.jpeg', description: 'Strong and full-bodied with deep chocolate undertones.' },
//   { id: 3, name: 'Honey Processed Coffee', flavor: 'Sweet & Fruity', price: 18, image: '/images/cpk3.jpeg', description: 'Naturally sweet with fruity acidity and a rich texture.' },
//   { id: 4, name: 'Espresso Blend', flavor: 'Rich & Smooth', price: 20, image: '/images/cpk4.jpeg', description: 'Perfect for espresso lovers with deep, bold flavors.' },
//   { id: 5, name: 'Dark Roast', flavor: 'Smoky & Intense', price: 22, image: '/images/cpk1.jpeg', description: 'Deep smokiness with an intense and full-bodied taste.' },
//   { id: 6, name: 'Light Roast', flavor: 'Bright & Citrus', price: 17, image: '/images/cpk2.jpeg', description: 'A light, citrusy blend for a refreshing coffee experience.' },
//   { id: 7, name: 'Vanilla Hazelnut', flavor: 'Smooth & Nutty', price: 19, image: '/images/cpk3.jpeg', description: 'A delicious combination of vanilla sweetness and nutty aroma.' },
//   { id: 8, name: 'Mocha Blend', flavor: 'Chocolate & Coffee', price: 21, image: '/images/cpk4.jpeg', description: 'The perfect balance of chocolate richness and coffee smoothness.' },
// ];

// const cardsPerPage = 4;
// const totalPages = Math.ceil(products.length / cardsPerPage);

// const Products: React.FC = () => {
//   const { addToCart } = useCart();
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState(1);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scrolls by 4 cards
//       scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const updateActiveIndex = () => {
//     if (scrollRef.current) {
//       const scrollLeft = scrollRef.current.scrollLeft;
//       const cardWidth = scrollRef.current.clientWidth * 0.8;
//       const newIndex = Math.round(scrollLeft / cardWidth);
//       setActiveIndex(newIndex);
//     }
//   };

//   useEffect(() => {
//     const scrollElement = scrollRef.current;
//     if (scrollElement) {
//       scrollElement.addEventListener('scroll', updateActiveIndex);
//       return () => scrollElement.removeEventListener('scroll', updateActiveIndex);
//     }
//   }, []);

//   return (
//     <section id="products" className="relative p-8 bg-[#3B2F2F] text-white">
//       <h2 className="text-4xl font-bold text-center mb-8 text-[#D2B48C]">Our Coffee Selection</h2>

//       <div className="relative">
//         {/* Left Scroll Button */}
//         <button 
//           onClick={() => scroll('left')} 
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#5C4033] p-4 rounded-full shadow-md hover:bg-[#8B5E3C] transition z-10"
//         >
//           <ChevronLeft size={30} className="text-white" />
//         </button>

//         {/* Product List */}
//         <div 
//           ref={scrollRef}
//           className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth snap-x no-scrollbar"
//         >
//           {products.map((product) => (
//             <motion.div 
//               key={product.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, ease: 'easeOut' }}
//               viewport={{ once: true }}
//               className="snap-center"
//             >
//               <ProductCard 
//                 product={product} 
//                 onViewMore={() => {
//                   setSelectedProduct(product);
//                   setQuantity(1);
//                 }} 
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* Right Scroll Button */}
//         <button 
//           onClick={() => scroll('right')} 
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#5C4033] p-4 rounded-full shadow-md hover:bg-[#8B5E3C] transition z-10"
//         >
//           <ChevronRight size={30} className="text-white" />
//         </button>
//       </div>

//       {/* Pagination Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalPages }).map((_, index) => (
//           <div
//             key={index}
//             className={`h-3 w-3 rounded-full transition-all ${
//               activeIndex === index ? 'bg-[#D2B48C] w-4' : 'bg-gray-500'
//             }`}
//           />
//         ))}
//       </div>

//       {/* Product Details Popup */}
//       {selectedProduct && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-amber-100 p-6 rounded-lg max-w-lg shadow-lg relative">
//             <button 
//               className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
//               onClick={() => setSelectedProduct(null)}
//             >
//               ✕
//             </button>

//             <Image 
//               src={selectedProduct.image} 
//               alt={selectedProduct.name} 
//               width={400} 
//               height={250} 
//               className="w-full h-60 object-cover rounded-md mb-4"
//             />

//             <h2 className="text-xl font-bold text-[#5C4033]">{selectedProduct.name}</h2>
//             <p className="text-gray-600">{selectedProduct.description}</p>
//             <p className="text-lg flex justify-center font-bold text-[#634a20] mt-2">${selectedProduct.price}</p>

//             <div className="flex justify-center items-center mt-4 bg-[#D2B48C] p-2 rounded">
//               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 bg-[#6D4C41] rounded text-white">-</button>
//               <span className="px-4 text-black">{quantity}</span>
//               <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-[#6D4C41] rounded text-white">+</button>
//             </div>

//             <button
//               onClick={() => {
//                 addToCart({ ...selectedProduct, quantity });
//                 setSelectedProduct(null);
//               }}
//               className="mt-4 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Products;

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import ProductCard from '../Product/ProductCard';

// const products = [
//   { id: 1, name: 'Arabica Beans', flavor: 'Nutty & Caramel', price: 15, image: '/images/cpk1.jpeg' },
//   { id: 2, name: 'Robusta Beans', flavor: 'Bold & Chocolaty', price: 12, image: '/images/cpk2.jpeg' },
//   { id: 3, name: 'Honey Processed Coffee', flavor: 'Sweet & Fruity', price: 18, image: '/images/cpk3.jpeg' },
//   { id: 4, name: 'Espresso Blend', flavor: 'Rich & Smooth', price: 20, image: '/images/cpk4.jpeg' },
// ];

// const Products: React.FC = () => {
//   return (
//     <motion.section 
//       id="products"
//       className="min-h-screen p-8"
//       initial={{ opacity: 0, y: 100 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1, ease: 'easeOut' }}
//       viewport={{ once: false, amount: 0.2 }}
//     >
//       <h2 className="text-4xl font-bold text-center mb-8 text-accent-beige">Our Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default Products;


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
