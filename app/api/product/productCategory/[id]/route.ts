import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Update the type definition for Params
interface Params {
  id: string; // id is a direct property in Params
}

// Update a category name
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = params;  // Directly destructure id from params
  const { name } = await request.json();

  if (!name || typeof name !== 'string') {
    return NextResponse.json(
      { error: 'Valid category name is required' },
      { status: 400 }
    );
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Error updating category' },
      { status: 500 }
    );
  }
}

// Delete a category and reassign its products to "Undefined"
export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = params;  // Directly destructure id from params

  try {
    // Ensure "Undefined" category exists
    let undefinedCategory = await prisma.category.findFirst({
      where: { name: "Undefined" },
    });

    if (!undefinedCategory) {
      undefinedCategory = await prisma.category.create({
        data: { name: "Undefined" },
      });
    }

    // Reassign products to "Undefined" category
    await prisma.product.updateMany({
      where: { categoryId: id },
      data: { categoryId: undefinedCategory.id },
    });

    // Delete the category
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Error deleting category' },
      { status: 500 }
    );
  }
}
