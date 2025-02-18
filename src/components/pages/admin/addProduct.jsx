import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../../utils/mediaUpload";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission

    const altNames = alternativeNames.split(",");

    // If no image is selected, set imageUrls to an empty array
    let imgUrls = [];
    if (imageFiles.length > 0) {
      const promisesArray = [];

      // Upload each image file and collect the URLs
      for (let i = 0; i < imageFiles.length; i++) {
        promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
      }

      // Wait for all image uploads to finish and collect the image URLs
      imgUrls = await Promise.all(promisesArray);
    }

    // Prepare the product data to be sent to the backend
    const product = {
      productId,
      productName,
      altNames,
      images: imgUrls,
      price,
      lastPrice,
      stock,
      description,
    };

    const token = localStorage.getItem("token");
    try {
      // Send a POST request to the backend to add the product
      await axios.post("http://localhost:5000/api/products", product, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // After successful submission, navigate to the product listing page
      navigate("/admin/products");

      // Show success message
      toast.success("Product added successfully");
    } catch (err) {
      // Show error message if there is a failure
      toast.error("Failed to add product");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-3 text-gray-800">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-3 rounded-lg shadow-md">
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Product ID</label>
          <input
            type="text"
            name="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Alternative Names</label>
          <input
            type="text"
            name="altNames"
            value={alternativeNames}
            onChange={(e) => setAlternativeNames(e.target.value)}
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Image URLs</label>
          <input
            type="file"
            name="images"
            onChange={(e) => setImageFiles(e.target.files)}
            multiple
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Last Price</label>
          <input
            type="number"
            name="lastPrice"
            value={lastPrice}
            onChange={(e) => setLastPrice(e.target.value)}
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1.5 rounded-lg text-sm hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
