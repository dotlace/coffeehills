'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Directly use useRouter() here
import axios from "axios";
import { useForm } from "react-hook-form";

const AddEditProductForm = ({ product }: any) => {
  const [imageUrl, setImageUrl] = useState<string | null>(product?.image || null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); // To hold categories
  
  // Directly use useRouter() here without useEffect
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: product || {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      image: "",
    },
  });

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/product/categories");
        setCategories(res.data); // Assuming the response is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // Make sure your Cloudinary preset is correct

        const res = await axios.post("https://api.cloudinary.com/v1_1/your-cloud-name/image/upload", formData);
        const { secure_url } = res.data; // Get the image URL from Cloudinary

        setImageUrl(secure_url);
        setValue("image", secure_url); // Save the image URL into form data
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle form submission (Add or Edit product)
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (product) {
        // Update existing product
        await axios.put(`/api/product/productCard/${product.id}`, data); // Adjusted to work with your existing API
      } else {
        // Add new product
        await axios.post("/api/product/productCard", data); // Adjusted to match the API for adding products
      }
      router.push("/admin/products"); // Redirect to the products list page
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#D2B48C]">
        {product ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Product Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full px-4 py-2 text-gray-900 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="mt-1 block w-full px-4 py-2 text-gray-900 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="mt-1 block w-full px-4 py-2 text-gray-900 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Category</label>
          <select
            {...register("categoryId", { required: true })}
            className="mt-1 block w-full px-4 py-2 text-gray-900 rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full px-4 py-2 text-gray-900 rounded-md dark:bg-gray-700 dark:text-white"
          />
          {loading && <p className="text-sm text-gray-500">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Product" className="mt-2 w-32 h-32 object-cover rounded" />}
        </div>

        <div className="flex justify-center">
          <button type="submit" className="px-6 py-2 bg-accent-darkGreen dark:bg-gray-800 text-white rounded-md">
            {product ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProductForm;




// 'use client';

// import { useState, useEffect } from "react";
// import Loading from "@/app/(website)/components/UI/Loading";

// // Define types for Product and Category
// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
//   category: {
//     id: string;
//     name: string;
//   };
// }

// // Define a type for grouping products by category
// interface GroupedProducts {
//   [categoryId: string]: {
//     categoryName: string;
//     products: Product[];
//   };
// }

// const ProductItems = () => {
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState<Product[]>([]);

//   // Fetch products from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("/api/product/productCard");

//         // Check if the response is OK (status 200)
//         if (!response.ok) {
//           throw new Error(`Failed to fetch products: ${response.statusText}`);
//         }

//         // Parse the JSON response
//         const data: Product[] = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center mt-8">
//         <Loading />
//       </div>
//     );
//   }

//   // Group products by category
//   const groupedProducts: GroupedProducts = products.reduce((acc, product) => {
//     const categoryId = product.category.id;
//     if (!acc[categoryId]) {
//       acc[categoryId] = {
//         categoryName: product.category.name,
//         products: [],
//       };
//     }
//     acc[categoryId].products.push(product);
//     return acc;
//   }, {} as GroupedProducts); // Use type assertion to explicitly set the type of the accumulator

//   return (
//     <div className="p-6 bg-gray-100 dark:bg-gray-800 text-white">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-[#D2B48C]">Product Items</h2>

//       {Object.keys(groupedProducts).map((categoryId) => {
//         const { categoryName, products } = groupedProducts[categoryId];

//         return (
//           <div key={categoryId} className="mb-8">
//             <h3 className="text-2xl font-semibold text-[#D2B48C] mb-4">{categoryName}</h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.length === 0 ? (
//                 <p className="text-center text-gray-500">No products available in this category.</p>
//               ) : (
//                 products.map((product) => (
//                   <div key={product.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-2xl w-64 transition-shadow">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-48 object-cover rounded-md mb-4"
//                     />
//                     <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h4>
//                     <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>
//                     <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">${product.price}</p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProductItems;
