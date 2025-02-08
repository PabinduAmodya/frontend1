import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="text-center font-sans p-6">
            {/* Header styling */}
            <header className="bg-blue-500 text-white p-6 rounded-lg">
                <h1 className="text-amber-50">Welcome to Our Website</h1>
                <p className="text-lg">Your one-stop solution for all services.</p>
            </header>

            {/* Login link */}
            <Link 
                to="/login" 
                className="text-blue-500 text-lg font-bold my-4 hover:underline"
            >
                Login
            </Link>

            {/* Navigation bar */}
            <nav className="my-5">
                <ul className="list-none p-0 flex justify-center space-x-6">
                    <li><a href="#" className="text-blue-500 text-lg font-bold hover:underline">Home</a></li>
                    <li><a href="#" className="text-blue-500 text-lg font-bold hover:underline">About</a></li>
                    <li><a href="#" className="text-blue-500 text-lg font-bold hover:underline">Services</a></li>
                    <li><a href="#" className="text-blue-500 text-lg font-bold hover:underline">Contact</a></li>
                </ul>
            </nav>

            {/* Content section */}
            <section className="m-5 p-6 bg-gray-200 rounded-lg max-w-3xl mx-auto">
                <h2 className="text-3xl text-gray-800">Our Services</h2>
                <p className="text-lg text-gray-600 mt-3">We offer a wide range of services to cater to your needs.</p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600">
                    Learn More
                </button>
            </section>

            {/* Footer */}
            <footer className="mt-8 p-4 bg-blue-500 text-white rounded-lg">
                <p>© 2025 Our Website. All rights reserved.</p>
            </footer>
        </div>
    );
}
