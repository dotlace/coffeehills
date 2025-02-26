// app/layout.tsx
import '../styles/globals.css';
import { CartProvider } from '../context/CartContent';
import UserCartIcons from '@/components/UserCartIcon';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Cafe Mandalay Hills</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-accent-deepCoffee">
        <CartProvider>
          <Logo />
          <UserCartIcons />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}



