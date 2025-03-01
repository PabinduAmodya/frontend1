import { useState } from "react";export default function Product11({ quantity, setQuantity }) {
    function increment() {
      setQuantity(quantity + 1);
    }
  
    function decrement() {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  
    return (
        <div className="flex flex-col items-center gap-3 p-4">
          <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2 shadow-sm bg-gray-50">
            <button 
              onClick={decrement} 
              className="w-8 h-8 flex items-center justify-center text-xl font-semibold "
            >
              −
            </button>
            <span className="text-lg font-medium text-gray-800">{quantity}</span>
            <button 
              onClick={increment} 
              className="w-8 h-8 flex items-center justify-center text-xl font-semibold "
            >
              +
            </button>
          </div>
        </div>
      );
      
  }
  