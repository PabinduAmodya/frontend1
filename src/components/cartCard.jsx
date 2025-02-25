import { useEffect, useState } from "react";
import axios from "axios";
import { deleteItem } from "../utils/cartFunction";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CartCard({ productId, qty, onCartUpdate }) {
    const [product, setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
                .then((response) => {
                    if (response.data != null) {
                        setProduct(response.data);
                        setLoaded(true);
                    } else {
                        deleteItem(productId);
                        onCartUpdate(); // Notify parent to update the cart
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [productId, loaded, onCartUpdate]);

    const handleDelete = () => {
        deleteItem(productId);
        toast.success("Deleted successfully!")
        onCartUpdate(); // Trigger cart update
    };

    if (!product) {
        return <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>;
    }

    return (
        <tr className="hover:bg-gray-100 transition-all duration-200 ease-in-out">
            <td className="flex items-center justify-center p-4">
                <img
                    src={product.images && product.images[0]}
                    alt={product.productName}
                    className="w-[90px] h-[90px] object-cover rounded-lg shadow-lg"
                />
            </td>
            <td className="text-center py-4 px-2 text-lg font-semibold">{product.productName}</td>
            <td className="text-center py-4 px-2 text-sm text-gray-600">{productId}</td>
            <td className="text-center py-4 px-2">{qty}</td>
            <td className="text-center py-4 px-2 text-black font-bold">{product.price}</td>
            <td className="text-center py-4 px-2 text-black font-bold">
                {(product.lastPrice * qty).toFixed(2)}
            </td>
            <td className="py-4 px-2 text-center align-middle">
                <FaTrashAlt className="text-black cursor-pointer inline-block" onClick={handleDelete} />
            </td>
        </tr>
    );
}
