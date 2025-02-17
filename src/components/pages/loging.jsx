import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      

    function login() {
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
            email: email,
            password: password
        }).then((res) => {
            console.log(res);
            if (res.data.user == null) {
                toast.error(res.data.message);
                return;
            }
            toast.success("Login successful!");
            localStorage.setItem("token", res.data.token);

            if (res.data.user.type == "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center">
                <img src="logo.jpg" alt="Logo" className="rounded-full w-16 mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Welcome Back</h2>
                
                <div className="w-full">
                    <label className="block text-gray-600 text-sm mb-1">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                
                <div className="w-full">
                    <label className="block text-gray-600 text-sm mb-1">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password" 
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                
                <button 
                    onClick={login} 
                    className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
                >
                    Login
                </button>
                
                <p className="text-sm text-gray-500 mt-4">
                    Don't have an account? <Link to="/signup" className="text-indigo-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
