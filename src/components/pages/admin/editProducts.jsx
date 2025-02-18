import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../../utils/mediaUpload";

export default function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get product data from state or localStorage (to persist on refresh)
  const storedProduct = JSON.parse(localStorage.getItem("editProduct")) || null;
  const product = location.state?.product || storedProduct;

  // Redirect if product is missing
  useEffect(() => {
    if (!product) {
      toast.error("No product data found. Redirecting...");
      navigate("/admin/products");
    } else {
      localStorage.setItem("editProduct", JSON.stringify(product)); // Store in localStorage
    }
  }, [product, navigate]);

  // Prevent rendering if no product data
  if (!product) return null;

  const altNames = product.altNames ? product.altNames.join(",") : "";

  // State for form fields
  const [productId, setProductId] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alternativeNames, setAlternativeNames] = useState(altNames);
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);
  const [loading, setLoading] = useState(false); // Loading state for button

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission default behavior
    setLoading(true); // Set loading state

    const altNamesArray = alternativeNames.split(",");

    let imgUrls = product.images || [];

    // If new images are selected, upload them
    if (imageFiles.length > 0) {
      try {
        const uploadPromises = [...imageFiles].map(file => uploadMediaToSupabase(file));
        imgUrls = await Promise.all(uploadPromises);
      } catch (error) {
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }
    }

    const productData = {
      productId,
      productName,
      altNames: altNamesArray,
      images: imgUrls,
      price,
      lastPrice,
      stock,
      description,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5000/api/products/${product.productId}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product updated successfully");
      localStorage.removeItem("editProduct"); // Remove stored product after update
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-3 text-gray-800">Edit Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-3 rounded-lg shadow-md">
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Product ID</label>
          <input disabled type="text" value={productId} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Product Name</label>
          <input type="text" value={productName} onChange={e => setProductName(e.target.value)} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Alternative Names</label>
          <input type="text" value={alternativeNames} onChange={e => setAlternativeNames(e.target.value)} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Upload Images</label>
          <input type="file" multiple onChange={e => setImageFiles(e.target.files)} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Last Price</label>
          <input type="number" value={lastPrice} onChange={e => setLastPrice(e.target.value)} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Stock</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none" required></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-1.5 rounded-lg text-sm hover:bg-blue-600" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
