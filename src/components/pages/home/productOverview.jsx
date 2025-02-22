import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./productnotFound";
import toast from "react-hot-toast";
import ImageSlider from "../../imageSlider";
import Product11 from "../../procard";
import { addToCart, clearCart } from "../../../utils/cartFunction";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log("Fetching product:", productId);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
      .then((res) => {
        console.log("Response Data:", res.data);

        if (!res.data) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setStatus("not-found"); // Handle API error as "not-found"
      });
  }, [productId]);

  function onAddtoCartClick(){
    addToCart(product.productId,1)
    toast.success(product.productId+"Added to cart")
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-white flex items-center justify-center">
      {status === "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-500 border-b-amber-600"></div>
        </div>
      )}

      {status === "not-found" && <NotFoundPage />}

      {status === "found" && (
  <div className="w-full h-full flex items-center justify-center bg-gray-50 py-8">
    <div className="max-w-screen-xl w-full h-[90vh] flex justify-between items-center bg-white shadow-lg rounded-lg overflow-hidden">
      
      {/* Image Section */}
      <div className="w-[40%] h-full flex items-center justify-center p-4">
        <ImageSlider images={product.images}/>
      </div>
      
      {/* Product Information Section */}
<div className="w-[60%] h-full p-6 flex flex-col gap-4 justify-center text-left">
    <h3 className="text-2xl font-semibold text-gray-800">{product.productName}</h3>

    <h2 className="text-xl font-medium text-gray-500">{product.altNames.join(" | ")}</h2>

    <p className="text-2xl font-semibold text-gray-500">
        {product.price > product.lastPrice && (
            <span className="line-through text-red-500">LKR {product.price}</span>
        )}
        <span className=""> LKR {product.lastPrice}</span>
    </p>

    <p className="text-lg text-gray-500 line-clamp-4">{product.description}</p>

    {/* ✅ Ensuring Product11 aligns properly */}
    <div className="self-start flex">
        <Product11 />
    </div>
    <button onClick={onAddtoCartClick} className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
                            Add to Cart</button>
    
    
</div>


    </div>
  </div>
)}

    </div>
  );
}
