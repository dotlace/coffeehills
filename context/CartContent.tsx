// context/CartContent.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  decrementFromCart: (id: number) => void;
  cartVisible: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartVisible, setCartVisible] = useState(false);

const addToCart = (item: CartItem) => {
  setCart((prev) => {
    const existingItem = prev.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      return prev.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity } // ✅ Update with correct quantity
          : cartItem
      );
    } else {
      setCartVisible(true); // Show cart icon when adding first item
      return [...prev, item]; // ✅ Keep the selected quantity
    }
  });
};


  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (cart.length <= 1) setCartVisible(false);
  };

  const decrementFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
    if (cart.length <= 1) setCartVisible(false);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decrementFromCart, cartVisible }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};




// // context/CartContent.tsx
// 'use client';

// import React, { createContext, useContext, useState } from 'react';

// export type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: number) => void;
//   decrementFromCart: (id: number) => void;
//   cartVisible: boolean;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartVisible, setCartVisible] = useState(false);

//   const addToCart = (item: CartItem) => {
//     setCart((prev) => {
//       const existingItem = prev.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         return prev.map((cartItem) =>
//           cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
//         );
//       } else {
//         setCartVisible(true); // Show cart icon when adding first item
//         return [...prev, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//     if (cart.length <= 1) setCartVisible(false);
//   };

//   const decrementFromCart = (id: number) => {
//     setCart((prev) =>
//       prev
//         .map((item) => {
//           if (item.id === id) {
//             return { ...item, quantity: item.quantity - 1 };
//           }
//           return item;
//         })
//         .filter((item) => item.quantity > 0)
//     );
//     if (cart.length <= 1) setCartVisible(false);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, decrementFromCart, cartVisible }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };


