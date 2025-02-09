import axios from "axios";
import { useState } from "react";

export default function AddProductPage() {
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    price: "",
    lastPrice: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", product);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Product ID</label>
          <input type="text" name="productId" value={product.productId} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input type="text" name="productName" value={product.productName} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Price</label>
          <input type="number" name="lastPrice" value={product.lastPrice} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
}
