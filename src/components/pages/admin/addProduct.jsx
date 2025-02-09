import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductPage() 
{
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  
   async function handleSubmit(){
      const altNames = alternativeNames.split(",")
      const imgUrls=imageUrls.split(",")

      const product = {
      productId : productId,
      productName : productName,
      altNames : altNames,
      images : imgUrls,
      price : price,
      lastPrice : lastPrice,
      stock : stock,
      description : description
     }

      const token = localStorage.getItem("token")
      try{
        await axios.post("http://localhost:5000/api/products",product,{
            headers : 
            {
              Authorization : "Bearer "+token
              
            }
            }) 
            toast.success("Product added successfully")
      }catch(err){
        console.log(err)
      }

      
    }
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-3 text-gray-800">Add Product</h1>
      <form  className="max-w-md mx-auto bg-white p-3 rounded-lg shadow-md">
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Product ID</label>
          <input type="text" name="productId" value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Product Name</label>
          <input type="text" name="productName" value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Alternative Names</label>
          <input type="text" name="altNames" value={alternativeNames} onChange={(e)=>{setAlternativeNames(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Image URLs</label>
          <input type="text" name="images" value={imageUrls} onChange={(e)=>{setImageUrls(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Price</label>
          <input type="number" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Last Price</label>
          <input type="number" name="lastPrice" value={lastPrice} onChange={(e)=>{setLastPrice(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Stock</label>
          <input type="number" name="stock" value={stock} onChange={(e)=>{setStock(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Description</label>
          <textarea name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" required></textarea>
        </div>
        <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white py-1.5 rounded-lg text-sm hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
}
