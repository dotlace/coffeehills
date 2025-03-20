import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import Prisma Client to interact with the database

// Handle GET request to fetch categories
export async function GET() {
  try {
    // Fetch categories from the database
    const categories = await prisma.category.findMany({
      include: { products: true }, // You can include products to get the count of items
    });

    // Map the categories to include items count
    const categoriesWithItemsCount = categories.map((category) => ({
      ...category,
      itemsCount: category.products.length, // Count the number of products in the category
    }));

    return NextResponse.json(categoriesWithItemsCount); // Send the data back as JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
