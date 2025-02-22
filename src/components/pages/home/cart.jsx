import { useEffect, useState } from "react"
import { loadCart } from "../../../utils/cartFunction"

export default function Cart(){
    
    const [cart,setCart] =useState([])
    useEffect(()=>{
        setCart(loadCart())
    })

    return (
        <div>
            {
                cart.map(
                    (item)=>{
                        return(
                           <span>{item.productId} X {item.qty}</span> 
                        )
                    }
                )
            }
        </div>
    )
    
}