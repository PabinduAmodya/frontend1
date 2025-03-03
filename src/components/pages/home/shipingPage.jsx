import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../cartCard";
import axios from "axios";
import toast from "react-hot-toast";

export default function ShippingPage() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labelTotal, setLabelTotal] = useState(0);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const items = location.state?.items || [];
        setCart(items);
        
        if (items.length > 0) {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, {
                orderedItems: items,
            })
            .then((res) => {
                setTotal(res.data.total || 0);
                setLabelTotal(res.data.labelTotal || 0);
            })
            .catch((error) => {
                console.error("Error fetching cart total:", error);
                setTotal(0);
                setLabelTotal(0);
            });
        }
    }, [location.state]);

    function createOrder() {
        if (!name || !address || !phone) {
            toast.error("Please fill in all fields!");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to place an order.");
            return;
        }

        axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
            {
                orderedItems: cart,
                name,
                address,
                phone,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then(() => {
            toast.success("Order placed successfully!");
            navigate("/order-success");
        })
        .catch((error) => {
            toast.error("Error placing order. Please try again.");
            console.error(error);
        });
    }

    return (
        <div className="w-full h-auto flex justify-center items-start bg-gray-100 px-6 py-4">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4 space-y-4">
                <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4">Shipping & Order Details</h1>

                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping Information</h2>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Enter your full name" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Enter your shipping address" rows="3" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Enter your phone number" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Summary</h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left text-sm py-2 px-2">Image</th>
                                    <th className="text-left text-sm py-2 px-2">Product Name</th>
                                    <th className="text-left text-sm py-2 px-2">Product Id</th>
                                    <th className="text-left text-sm py-2 px-2">Quantity</th>
                                    <th className="text-left text-sm py-2 px-2">Price</th>
                                    <th className="text-left text-sm py-2 px-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-sm text-gray-500">Your cart is empty.</td>
                                    </tr>
                                ) : (
                                    cart.map((item) => (
                                        <CartCard key={item.productId} productId={item.productId} qty={item.qty} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {cart.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-700">Total: LKR {labelTotal ? labelTotal.toFixed(2) : "0.00"}</p>
                            <p className="text-sm text-gray-700">Discount: LKR {labelTotal && total ? (labelTotal - total).toFixed(2) : "0.00"}</p>
                            <p className="text-sm font-bold text-gray-900">Grand Total: LKR {total ? total.toFixed(2) : "0.00"}</p>
                        </div>
                    )}

                    {cart.length > 0 && (
                        <div className="mt-4 text-center">
                            <button onClick={createOrder} className="w-full px-6 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition">Place Order</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}