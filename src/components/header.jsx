import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-[#f3efed] h-[80px] w-full flex items-center justify-between px-6 shadow-md relative">
            
            {/* Logo */}
            <Link to="/">
                <img 
                    src="/logo.png" 
                    alt="Logo"
                    className="cursor-pointer w-[65px] h-[65px] rounded-full"
                />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex space-x-8 text-gray-800 font-medium text-lg">
                {["Home  ", "Products  ", "About Us  ", "Contact Us" , "Orders"].map((item, index) => (
                    <Link 
                        key={index} 
                        to={`/${item.toLowerCase().replace(" ", "")}`} 
                        className="relative hover:text-gray-600 transition duration-300 
                                   after:block after:h-[2px] after:bg-gray-600 after:w-full 
                                   after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                                   after:duration-300 after:origin-left"
                    >
                        {item}
                    </Link>
                ))}
            </nav>

            {/* Cart and Hamburger Menu Icons */}
            <div className="flex items-center space-x-4">
                {/* Cart Button */}
                <Link to="/cart" className="relative">
                    <div className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 flex items-center justify-center">
                        <FaShoppingCart className="text-gray-700 text-2xl" />
                    </div>
                </Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button 
                    className="lg:hidden text-gray-800 text-3xl" 
                    onClick={() => setMenuOpen(true)}
                >
                    <FaBars />
                </button>
            </div>

            {/* Full-Screen Mobile Menu */}
            <div 
                className={`fixed inset-0  bg-black bg-opacity-90 flex flex-col items-center justify-center text-white text-2xl space-y-6 transition-transform duration-300 z-50
                ${menuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
            >
                {/* Close Button */}
                <button className="absolute top-6 right-6 text-4xl" onClick={() => setMenuOpen(false)}>
                    <FaTimes />
                </button>

                {/* Navigation Links (With Underline) */}
                {["Home", "Products", "About Us", "Contact Us"].map((item, index) => (
                    <Link 
                        key={index} 
                        to={`/${item.toLowerCase().replace(" ", "")}`} 
                        className="relative hover:text-gray-400 transition duration-300 
                                   after:block after:h-[2px] after:bg-white after:w-full 
                                   after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                                   after:duration-300 after:origin-left"
                        onClick={() => setMenuOpen(false)} // Close menu on link click
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </header>
    );
}
