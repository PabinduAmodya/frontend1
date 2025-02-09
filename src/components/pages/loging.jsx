import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {

    const[email,setEmail]=useState("Your Email")
    const[password,setPassword]=useState("Password")

    function login(){
        axios.post("http://localhost:5000/api/users/login",{
            email : email,
            password : password
        }).then((res)=>{
            console.log(res)
            if(res.data.user==null){
                toast.error(res.data.message)
                return
            }
            toast.success("login success!")
            localStorage.setItem("token",res.data.token)

            if(res.data.user.type=="admin"){
                window.location.href = "/admin"
            } 
            else{
                window.location.href="/"
            }

        })

    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-red-900">
            <div className="w-[450px] h-[450px] bg-blue-600 flex justify-center items-center flex-col">
                <img src="logo.jpg" className="rounded-full w-[50px]"/>
                <br />
                <br />
                <span>Email</span>
                <input type="text" defaultValue={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }} className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <span>Password</span>
                <input type="password" defaultValue={password} onChange={
                    (e)=>{
                        setPassword(e.target.value)
                    }
                }  className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button onClick={login} className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-lg hover:bg-black transition duration-300">Login</button>


                
            </div>
           
        </div>
    );
}
