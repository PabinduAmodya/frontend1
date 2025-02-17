import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-[#f3efed] h-[80px] w-full flex items-center px-6 shadow-md relative">
            {/* Logo Image */}
            <img 
                src="/logo.png" 
                alt="Logo"
                className="cursor-pointer w-[60px] h-[60px] rounded-full absolute left-4 top-1/2 -translate-y-1/2"
            />

            {/* Navigation Links with Underline Animation */}
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
        </header>
    );
}


