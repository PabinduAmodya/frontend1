import { useState } from "react";export default function Product11({ quantity, setQuantity }) {
    function increment() {
      setQuantity(quantity + 1);
    }
  
    function decrement() {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  
    return (
      <div className="flex flex-col items-center gap-3 p-4">
        <div className="flex items-center gap-4 border p-2 rounded-md">
          <button 
            onClick={decrement} 
            className="px-3 py-1"
          >
            −
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button 
            onClick={increment} 
            className="px-3 py-1"
          >
            +
          </button>
        </div>
      </div>
    );
  }
  