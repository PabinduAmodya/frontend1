import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../../utils/mediaUpload";


export default function EditProduct() 
{
  const location =useLocation()
  const navigate = useNavigate()
  const product =location.state.product

  if(!product){
    navigate("/admin/products")
  }
  const [productId, setProductId] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);
  
  

  console.log(location)


   async function handleSubmit(){
      const altNames = alternativeNames.split(",")

      const promisesArray = []
      
      for(let i=0; i<imageFiles.length; i++){
        promisesArray[i] =uploadMediaToSupabase(imageFiles[i])

      }
      const imgUrls = await Promise.all(promisesArray)

      
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
            navigate("/admin/products")

            toast.success("Product added successfully")
      }catch(err){
        toast.error("Failed to add product")
      }

      
    }
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-3 text-gray-800">Edit Product</h1>
      <form  className="max-w-md mx-auto bg-white p-3 rounded-lg shadow-md">
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Product ID</label>
          <input disabled type="text" name="productId" value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" required />
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
          <input type="file" name="images"  
          onChange={(e)=>{
            
            setImageFiles(e.target.files)

          }} multiple className="w-full p-1.5 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300" />
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
        <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white py-1.5 rounded-lg text-sm hover:bg-blue-600">Edit Now</button>
      </form>
      
    </div>
  );
}