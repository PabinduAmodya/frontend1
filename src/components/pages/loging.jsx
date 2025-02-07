import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold mb-6">Login Page</h1>

            <input
                type="text"
                placeholder="Enter your name"
                className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="password"
                placeholder="Enter your password"
                className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                Login
            </button>

            <p className="mt-4 text-sm text-gray-600">
                Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
        </div>
    );
}
