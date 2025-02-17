import { useState } from "react";  

export default function Product() {
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(100);

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        if (count > 1) setCount(count - 1);
    }

    return (
        <div className="w-64 p-5 rounded-lg bg-white shadow-lg text-center transition-transform transform hover:scale-105">
            <h1 className="text-xl font-bold text-gray-800 mb-2">Product One</h1>
            <h2 className="text-lg text-gray-600 mb-4">Price: ${price * count}</h2>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-lg transition duration-300 hover:bg-orange-600">
                Add to cart
            </button>

            <p className="mt-4 text-lg">Quantity: {count}</p>

            <div className="flex justify-center gap-4 mt-2">
                <button
                    onClick={decrement}
                    className="bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-lg transition duration-300 hover:bg-gray-400"
                >
                    -
                </button>
                <button
                    onClick={increment}
                    className="bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-lg transition duration-300 hover:bg-gray-400"
                >
                    +
                </button>
            </div>
        </div>
    );
}
