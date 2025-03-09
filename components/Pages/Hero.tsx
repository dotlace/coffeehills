// components/hero.tsx

'use client'; 

import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  // Updated image paths
  const images = [
    "/images/coffee-plantation.jpeg",
    "/images/coffee-plantation2.jpeg",
    "/images/harvesting-farm-girls.jpeg"
  ];

  // State to track the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="h-screen relative">
      {/* Image Slider */}
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${img}')`,
            transition: 'opacity 2s ease',
            opacity: index === currentIndex ? 1 : 0
          }}
        ></div>
      ))}

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold drop-shadow-lg mb-8">Welcome to Cafe Mandalay Hills </h1>
        <h1 className="text-3xl text-white font-bold drop-shadow-lg mb-8">Organic Coffee Farm</h1>

        {/* Dot Indicators */}
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;



// // components/hero.tsx
// import React from 'react';

// const Hero: React.FC = () => {
//   return (
//     <section id="home" className="h-screen relative">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-fixed"
//         style={{ backgroundImage: "url('/images/coffee-plantation.jpeg')" }}
//       ></div>
//       <div className="relative h-full flex items-center justify-center">
//         <h1 className="text-5xl text-white font-bold drop-shadow-lg">
//           Welcome to Coffee Mandalay Hills
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default Hero;
