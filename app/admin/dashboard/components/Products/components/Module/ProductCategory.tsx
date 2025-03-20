import { useState } from 'react';
import { SaveButton } from '../../../UI/Button'; // Correct import for SaveButton

const ProductCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitting || !categoryName.trim()) return;

    setIsSubmitting(true);

    try {
      // Call the specific API endpoint based on your project structure
      const response = await fetch('/api/product/productCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const newCategory = await response.json();
      setCategoryName('');
      alert(`Category "${newCategory.name}" created successfully!`);
    } catch (error) {
      console.error(error);
      alert('Error creating category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-4"> {/* Reduced padding-top to move closer to top */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        {/* Category Name Label */}
        <div>
          <label htmlFor="categoryName" className="block text-sm">Category Name</label>
        </div>
        {/* Category Input Field */}
        <div>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-96 bg-accent-stone" 
          />
        </div>
        {/* Save Button */}
        <div>
          <SaveButton />
        </div>
      </form>
    </div>
  );
};

export default ProductCategory;

