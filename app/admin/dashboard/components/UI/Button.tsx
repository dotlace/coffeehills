'use client';

// Save Button
export const SaveButton = () => {
  return (
    <button className="relative overflow-hidden px-5 py-2 text-sm bg-accent-darkGreen dark:bg-gray-700 text-white border-0 rounded-lg cursor-pointer"> {/* Smaller padding */}
      
      {/* Gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30 rounded-lg"></div>

      {/* Transition circle effect */}
      <div className="transition-all duration-500 ease-in-out absolute w-0 h-0 bg-accent-ghost rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Label */}
      <span className="relative z-10">Save</span>

      {/* Button hover and active state */}
      <style jsx>{`
        button:hover .transition-all {
          width: 10em;  /* Smaller circle size */
          height: 10em; /* Smaller circle size */
        }

        button:active {
          transform: scale(0.97);
        }
      `}</style>
    </button>
  );
};


  