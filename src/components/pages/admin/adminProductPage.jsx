import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if(!productsLoaded)
    {
        axios.get("http://localhost:5000/api/products").then((res) => {
            setProducts(res.data);
            setProductsLoaded(true);
          });

    }
    
  }, [productsLoaded]);

  return (
    <div className="container mx-auto p-6">
        <Link to={"/admin/products/addProduct"} className="absolute right-[25px] bottom-[25px] text-[25px] bg-blue-500 text-white p-5 rounded-xl hover:bg-blue-300 "><FaPlus/></Link>
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Admin Product Page</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Product ID</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Last Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">{product.productId}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{product.productName}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 line-through text-red-500">${product.lastPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold">{product.stock}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{product.description}</td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button className="text-red-500 hover:text-red-700" title="Delete" onClick={()=>{
                    alert(product.productId)
                    const token = localStorage.getItem("token");
                    axios.delete(`http://localhost:5000/api/products/${product.productId}`,{
                        headers:{
                            Authorization: `Bearer ${token}`,

                        },
                    }).then((res)=>{
                        console.log(res.data);
                        toast.success("Product deleted successfully")
                        setProductsLoaded(false);
                    })

                  }}>
                    <FaTrashAlt size={18} />
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaPencilAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
