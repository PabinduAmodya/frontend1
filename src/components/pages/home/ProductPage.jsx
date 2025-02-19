import axios from "axios";
import { useEffect } from "react";

export default function ProductPage() {

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products').then(
            (res)=>console.log(res.data)
        )
    })
    return (
        <div>
            <h1>Product Page</h1>
        </div>
    );
}
