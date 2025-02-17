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

            {/* Navigation Links */}
            <nav className="w-full flex justify-center space-x-8 text-gray-800 font-medium text-lg">
                <Link to="/" className="hover:text-gray-600 transition">Home</Link>
                <Link to="/products" className="hover:text-gray-600 transition">Products</Link>
                <Link to="/about" className="hover:text-gray-600 transition">About Us</Link>
                <Link to="/contact" className="hover:text-gray-600 transition">Contact Us</Link>
            </nav>
        </header>
    );
}

