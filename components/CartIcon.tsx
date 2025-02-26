// // components/CartIcon.tsx
// 'use client';

// import React, { useState } from 'react';
// import { useCart } from '@/context/CartContent';
// import { ShoppingCart } from 'lucide-react';
// import CartModal from './CartModal';

// const CartIcon: React.FC = () => {
//   const { cart, cartVisible } = useCart();
//   const [modalOpen, setModalOpen] = useState(false);

//   if (!cartVisible) return null;

//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <>
//       <div
//         className="fixed top-4 right-8 z-50 cursor-pointer bg-white/40 p-2 rounded"
//         onClick={() => setModalOpen(true)}
//       >
//         <div className="relative">
//           <ShoppingCart size={32} className="text-accent-deepCoffee" />
//           <span className="absolute -top-2 -right-2 bg-accent-olive text-white text-xs font-bold px-2 py-1 rounded-full">
//             {totalItems}
//           </span>
//         </div>
//       </div>
//       {modalOpen && <CartModal onClose={() => setModalOpen(false)} />}
//     </>
//   );
// };

// export default CartIcon;


