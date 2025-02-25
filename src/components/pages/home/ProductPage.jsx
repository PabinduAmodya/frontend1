import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../productCard";

export default function ProductPage() {

    const[products,setProduct] = useState([])
    const[loadingStatus,setLoadingStatus] =useState('loading')//loaded loading error
    

    useEffect(()=>{
        if(loadingStatus=='loading'){
            axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products').then(
                (res)=>{
                    console.log(res.data)
                    setProduct(res.data)
                    setLoadingStatus('loaded')
                }
            ).catch(
                (err)=>toast.error("Failed to fetch products")
            )
        }
       
    }
,[])
    return (
        <div className=" w-full h-full overflow-y-scroll flex flex-wrap gap-6 justify-center">
            {
                
                products.map(
                    (product)=>
                        <ProductCard product={product}/>
                )
            }
        </div>
    );
}
