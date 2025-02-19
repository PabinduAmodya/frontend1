import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="w-[250px] h-[450px] bg-[#f4f0ec]  shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link to={`/productInfo/${product.productId}`} className="block h-full">
                <div className="flex flex-col items-center p-0 h-full">
                    {/* Product Image (Top Half of the Card) */}
                    <div className="w-full h-[50%] rounded-t-2xl overflow-hidden bg-gray-200">
                        <img
                            src={product.images[1]}
                            alt={product.productName}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Product Details (Bottom Half of the Card) */}
                    <div className="w-full h-[50%] flex flex-col justify-between p-4">
                        <h1 className="text-lg font-semibold text-gray-800">{product.productName}</h1>
                        <p className="mt-2 text-xl  text-gray-900">LKR {product.lastPrice}</p>
                        <p className="mt-2 text-lg line-through  text-gray-600">LKR {product.price}</p>
                        {/* View More Button */}
                        <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
