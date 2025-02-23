import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
    return (
        <header className="bg-[#f3efed] h-[80px] w-full flex items-center px-6 shadow-md relative">
            {/* Logo Image */}
            <img 
                src="/logo.png" 
                alt="Logo"
                className="cursor-pointer w-[60px] h-[60px] rounded-full absolute left-4 top-1/2 -translate-y-1/2"
            />

            {/* Navigation Links */}
            <nav className="w-full flex justify-center space-x-8 text-gray-800 font-medium text-lg">
                <Link to="/" className="relative hover:text-gray-600 transition duration-300 
                                       after:block after:h-[2px] after:bg-gray-600 after:w-full 
                                       after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                                       after:duration-300 after:origin-left">
                    Home
                </Link>
                <Link to="/products" className="relative hover:text-gray-600 transition duration-300 
                                                after:block after:h-[2px] after:bg-gray-600 after:w-full 
                                                after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                                                after:duration-300 after:origin-left">
                    Products
                </Link>
                <Link to="/about" className="relative hover:text-gray-600 transition duration-300 
                                             after:block after:h-[2px] after:bg-gray-600 after:w-full 
                                             after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                                             after:duration-300 after:origin-left">
                    About Us
                </Link>
                <Link to="/contact" className="relative hover:text-gray-600 transition duration-300 
                                               after:block after:h-[2px] after:bg-gray-600 after:w-full 
                                               after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                                               after:duration-300 after:origin-left">
                    Contact Us
                </Link>
            </nav>

            {/* Cart Button Positioned on the Right */}
            <Link to="/cart" className="absolute right-6 top-1/2 -translate-y-1/2 group">
                <div className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 flex items-center justify-center relative">
                    <FaShoppingCart className="text-gray-700 group-hover:text-gray-900 text-2xl" />
                    {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        3 
                    </span> */}
                </div>
            </Link>
        </header>
    );
}


