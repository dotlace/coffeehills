export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    flavor?: string;
    image: string;
    createdAt: string; // ISO string representation of DateTime
  }
  