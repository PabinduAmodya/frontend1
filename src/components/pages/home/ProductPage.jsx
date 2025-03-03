import ProductCard from "../../productCard";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); // 'loaded', 'loading', 'error'
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }, [loadingStatus]);

  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");

    if (query === "") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }

  return (
    <div className="w-full h-full pt-8 relative">
      {/* Search Bar */}
      <div className="absolute w-full flex justify-center z-10 pt-4">
        <input
          type="text"
          className="w-[300px] p-3 rounded-3xl border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 mb-8"  // Added margin-bottom (mb-8)
          placeholder="Search Products"
          onChange={search}
          value={query}
        />
      </div>

      {/* Loading Spinner */}
      {loadingStatus === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-accent border-b-4"></div>
        </div>
      ) : (
        <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center gap-6 pt-25 relative">
          {/* Render Product Cards with spacing between them */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
