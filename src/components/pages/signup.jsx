import { Link } from "react-router-dom";

export default function SignUpPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>

            <input
                type="text"
                placeholder="Enter your name"
                className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="password"
                placeholder="Create a password"
                className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                Sign Up
            </button>

            <p className="mt-4 text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link>
            </p>
        </div>
    );
}
