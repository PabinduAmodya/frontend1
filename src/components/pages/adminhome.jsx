import { Link, Route, Routes } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { FaPencilAlt, FaShoppingCart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import AdminProductPAge from "./admin/adminProductPage";
import AddProductPage from "./admin/addProduct";
import EditProduct from "./admin/editProducts";






export default function AdminHomePage() {
    return (
        <div className="bg-blue-300 w-full h-screen flex">
            {/* Sidebar */}
            <div className="w-[20%] h-screen bg-blue-500 p-4 text-white flex flex-col items-center">
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
            
            
            <div className="w-[80%] h-screen bg-blue-200 ">
                
               <Routes path="/*">
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                    <Route path="/products" element={<AdminProductPAge/>} />
                    <Route path="/products/addProduct" element={<AddProductPage/>}/>
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/products/edit" element={<EditProduct/>} />
                    <Route path="/customers" element={<h1>Customers</h1>} />
                    <Route path="/*" element={<h1>404 NOT FOUND</h1>} />
               </Routes>
            
                
            </div>
        </div>
    );
}
