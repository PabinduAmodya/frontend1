import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./productnotFound";

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

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-white flex items-center justify-center">
      {status === "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-500 border-b-amber-600"></div>
        </div>
      )}

      {status === "not-found" && <NotFoundPage />}

      {status === "found" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[35%] h-full">
            <img src={product.images[0]} className="w-full h-[300px] object-cover rounded-lg" />
          </div>
          <div className="w-[65%] h-full p-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
            <p className="text-xl text-gray-600">${product.price}</p>
            <p className="text-lg text-gray-600 line-clamp-3">{product.description}</p>

          </div>
        </div>
      )}
    </div>
  );
}
