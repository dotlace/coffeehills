'use client';

import { CartProvider } from '../context/CartContent';
import Footer from './(website)/components/Layout/Footer';
import { usePathname } from 'next/navigation';
import '@/app/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Cafe Mandalay Hills</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-accent-deepCoffee">
        <CartProvider>
          {children}
          {!pathname.startsWith('/admin') && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}



