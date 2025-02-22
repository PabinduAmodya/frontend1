import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false); // ✅ Added state to track hover

    return (
        <div className="w-[250px] h-[450px] bg-[#f4f0ec] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link to={`/productInfo/${product.productId}`} className="block h-full">
                <div className="flex flex-col items-center p-0 h-full">
                    
                    {/* ✅ Only this div handles hover for image change */}
                    <div 
                        className="w-full h-[50%] overflow-hidden bg-gray-200"
                        onMouseEnter={() => setIsHovered(true)}  // ✅ Change image on hover
                        onMouseLeave={() => setIsHovered(false)} // ✅ Revert image when not hovered
                    >
                        <img
                            src={isHovered ? product.images[1] : product.images[0]} // ✅ Dynamically change image
                            alt={product.productName}
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full h-[50%] flex flex-col justify-between p-4">
                        <h1 className="text-lg font-semibold text-gray-800">{product.productName}</h1>
                        <p className="mt-2 text-xl text-gray-900">LKR {product.lastPrice}</p>
                        <p className="mt-2 text-lg line-through text-gray-600">LKR {product.price}</p>
                        {/* View More Button */}
                        <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
                        <FaShoppingCart className="text-lg" />Add to Cart</button>

                    </div>
                </div>
            </Link>
        </div>
    );
}
