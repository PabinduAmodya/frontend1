import { useEffect, useState } from "react";
import axios from "axios";
import { deleteItem } from "../utils/cartFunction";

export default function CartCard(props) {
    const { productId, qty } = props;
    
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
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [productId, loaded]);

    // Ensure that the product data is loaded before rendering
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
    

            
        </tr>

       
    );
}
