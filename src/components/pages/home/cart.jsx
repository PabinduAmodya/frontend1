import { useEffect, useState } from "react";
import { loadCart } from "../../../utils/cartFunction";
import CartCard from "../../cartCard";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labelTotal, setLabelTotal] = useState(0);

    // Function to update cart and total price
    function updateCart() {
        const updatedCart = loadCart();
        setCart(updatedCart);

        // Recalculate total when the cart updates
        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
                orderedItems: updatedCart,
            })
            .then((res) => {
                setTotal(res.data.total);
                setLabelTotal(res.data.labelTotal);
            })
            .catch((error) => console.error("Error fetching cart total:", error));
    }

    // Load cart data on mount
    useEffect(() => {
        updateCart();
    }, []);

    function onOrderCheckOutClick() {
        const token = localStorage.getItem("token");

        if (token == null) {
            return;
        }

        axios
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/orders",
                {
                    orderedItems: cart,
                    name: "Pabindu",
                    address: "Kathaluwa west, Ahangama.",
                    phone: "0743663828",
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
            });
    }

    return (
        <div className="w-full h-full overflow-y-scroll flex-col flex justify-items-end">
            <br />
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Product Id</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <CartCard
                            key={item.productId}
                            productId={item.productId}
                            qty={item.qty}
                            onCartUpdate={updateCart} // Pass function to re-render cart
                        />
                    ))}
                </tbody>
            </table>

            <h1 className="text-3xl font-bold text-black">Total: LKR {labelTotal.toFixed(2)}</h1>
            <h1 className="text-3xl font-bold text-black">Discount: LKR {(labelTotal - total).toFixed(2)}</h1>
            <h1 className="text-3xl font-bold text-black">Grand Total: LKR {total}</h1>

            {cart.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onOrderCheckOutClick}
                        className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
