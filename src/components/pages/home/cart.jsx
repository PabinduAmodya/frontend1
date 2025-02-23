import { useEffect, useState } from "react";
import { loadCart } from "../../../utils/cartFunction";
import CartCard from "../../cartCard";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total,setTotal] =useState(0)
    const [labelTotal,setLabelTotal] =useState(0)


    useEffect(() => {
        setCart(loadCart())
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/orders/quote",{
            orderedItems : loadCart()
        }).then(
            (res)=>{
                console.log(res.data)
                setTotal(res.data.total)
                setLabelTotal(res.data.labelTotal)

            }
        )
    }, []); 

    function onOrderChoeckOutClick(){

        const token=localStorage.getItem("token");


        if(token==null){
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/orders",{
            orderedItems : cart,
             name : "pabindu",
             address :"Kathaluwa west, Ahangama.",
             phone : "0743663828"


        }, {
            headers: {
              Authorization: "Bearer " + token,
            },}).then(
            (res)=>{
                console.log(res.data)
            }
        )
        

    }

    return (
        <div className="w-full h-full overflow-y-scroll  flex-col flex justify-items-end">
            <br></br>
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
                        <CartCard key={item.productId} productId={item.productId} qty={item.qty} />
                    ))}
                </tbody>
            </table>

            <h1 className="text-3xl font-bold text-black ">Total: LKR {labelTotal.toFixed(2)}</h1>
            <h1 className="text-3xl font-bold text-black">Discount: LKR {(labelTotal - total).toFixed(2)}</h1>
            <h1 className="text-3xl font-bold text-black">Grand Total: LKR {total}</h1>

            {cart.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button onClick={onOrderChoeckOutClick} className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                        Checkout
                    </button>
                </div>
            )} </div>
    );
}
