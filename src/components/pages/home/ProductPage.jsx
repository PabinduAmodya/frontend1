import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../productCard";

export default function ProductPage() {
    const [products, setProduct] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("loading"); // 'loaded', 'loading', 'error'

    useEffect(() => {
        if (loadingStatus === "loading") {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                .then((res) => {
                    console.log(res.data);
                    setProduct(res.data);
                    setLoadingStatus("loaded");
                })
                .catch((err) => {
                    toast.error("Failed to fetch products");
                    setLoadingStatus("error");
                });
        }
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            {loadingStatus === "loading" ? (
                // Animated Spinner
                <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-500 border-b-amber-600"></div>
        </div>
            ) : loadingStatus === "error" ? (
                <p className="text-red-500 text-lg">Failed to load products. Try again later.</p>
            ) : (
                <div className="w-full h-full overflow-y-scroll flex flex-wrap gap-6 justify-center">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
