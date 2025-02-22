import { useEffect, useState } from "react";
import { loadCart } from "../../../utils/cartFunction";
import CartCard from "../../cartCard";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(loadCart());
    }, []); // Added empty dependency array to run only once when the component mounts

    return (
        <div className="w-full h-full overflow-y-scroll  flex-col flex justify-items-end">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Product Id</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <CartCard key={item.productId} productId={item.productId} qty={item.qty} />
                    ))}
                </tbody>
            </table>
            {cart.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                        Checkout
                    </button>
                </div>
            )} </div>
    );
}
