import { useState } from "react";  // ✅ Import useState
import "./product.css";

export default function Product() {
    const [count, setCount] = useState(1);
    const [price,setprice] = useState(100)

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div className="product-card">
            <h1>Product One</h1>
            <h2>Price: {price*count}</h2>
            <button>Add to cart</button>

           
            <p>Quantity: {count}</p>

            <button onClick={decrement} className="quantity-btn">-</button>
            <button onClick={increment} className="quantity-btn">+</button>
        </div>
    );
}
