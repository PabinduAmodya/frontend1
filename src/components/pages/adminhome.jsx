import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { FaPencilAlt, FaShoppingCart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import AdminProductPAge from "./admin/adminProductPage";
import AddProductPage from "./admin/addProduct";
import EditProduct from "./admin/editProducts";
import AdminOrdersPage from "./admin/adminOrder";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";








export default function AdminHomePage() {
    const [user,setUser] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {      
      navigate("/login")
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{
        console.log(res.data)
        if(res.data.type!="admin"){
          toast.error("Unauthorized access")
          navigate("/login")
        }else{
          setUser(res.data)
        }

      }).catch((err)=>{
        console.error(err)
        toast.error("Failed to fetch user data")
        navigate("/login")
      })
    },[])

    return (
        <div className="bg-blue-300 w-full min-h-screen flex">
            {/* Sidebar */}
            <div className="w-[20%] min-h-screen bg-blue-500 p-4 text-white flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2 list-none w-full">
                        <Link to="/admin/dashboard" className="flex items-center gap-2 p-2 hover:bg-blue-600 rounded text-center w-full">
                            <MdDashboard /> Dashboard
                        </Link>
                        <li>
                            <Link to="/admin/products" className="flex items-center gap-2 p-2 hover:bg-blue-600 rounded text-center w-full"><FaBoxArchive />
                            Products</Link>
                        </li>
                        <li>
                            <Link to="/admin/orders" className="flex items-center gap-2 p-2 hover:bg-blue-600 rounded text-center w-full"><FaShoppingCart />
                            Orders</Link>
                        </li>
                        <li>
                            <Link to="/admin/customers" className="flex items-center gap-2 p-2 hover:bg-blue-600 rounded text-center w-full"><IoPeople />
                            Customers</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            
            {/* Main Content */}
            <div className="w-[80%] min-h-screen bg-blue-200 overflow-auto">
                {user!=null && <Routes path="/*">
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                    <Route path="/products" element={<AdminProductPAge/>} />
                    <Route path="/products/addProduct" element={<AddProductPage/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>} />
                    <Route path="/products/edit" element={<EditProduct/>} />
                    <Route path="/*" element={<h1>404 NOT FOUND</h1>} />
                </Routes>}
                {
                    user==null&&<div className="w-full h-full flex justify-center items-center">
                         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>

                    </div>
                }
            </div>
        </div>
    );
    
}
