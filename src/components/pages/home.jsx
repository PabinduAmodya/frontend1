import { Link, Route, Routes } from "react-router-dom";
import Header from "../header";
import LoginPage from "./loging";
import ProductOverview from "./home/productOverview";
import ProductPage from "./home/ProductPage"; // Corrected import
import Cart from "./home/cart";
import ShippingPage from "./home/shipingPage";

export default function HomePage() {
    return (
        <div className="h-[50px] w-full">
            <Header />
            <div className="w-full h-[calc(100vh-80px)] bg-white">
                <Routes>
                <Route path="/*" element={<h1>Home Page</h1>} />
                    <Route path="/home" element={<h1>Home Page</h1>} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shiping" element={<ShippingPage/>} />
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/productInfo/:id" element={<ProductOverview />} />
                </Routes>
            </div>
        </div>
    );
}
