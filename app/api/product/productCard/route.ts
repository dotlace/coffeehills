import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Prisma ORM for database interaction
import { NextRequest } from "next/server";

// GET: Fetch all products with associated categories
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,  // Include category data with each product
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST: Add a new product
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();  // Extract data from request body
    const { name, description, price, categoryId, image, stock = 0 } = data; // Use default stock value as 0 if not provided

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        image,
        stock,  // Add stock to product creation
      },
    });

    return NextResponse.json(newProduct, { status: 201 }); // Return the newly created product
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// PUT: Update an existing product by ID
export async function PUT(req: NextRequest, { params }: any) {
  try {
    const data = await req.json();  // Extract data from request body
    const { name, description, price, categoryId, image } = data; // Extract updated fields

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },  // Update product by ID from params
      data: {
        name,
        description,
        price,
        categoryId,
        image,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 }); // Return the updated product
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(req: NextRequest, { params }: any) {
  try {
    await prisma.product.delete({
      where: { id: params.id },  // Delete product by ID from params
    });
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 }); // Success message
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
