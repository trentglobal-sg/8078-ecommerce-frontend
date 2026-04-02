import { useEffect } from "react";
import { useCart } from "./CartStore"
import { useJwt } from "./UserStore";
import axios from "axios";

export default function ShoppingCart() {
    const { cart, getCartTotal, removeFromCart, updateQuantity, fetchCart } = useCart();
    const { getJwt} = useJwt();
    
    useEffect(()=>{
        fetchCart();
    }, [])

    return <div className="container">
        <h3>Shopping Cart</h3>
        <ul className="list-group">

            {
                cart.map((cartItem) => {
                    return (<li className="list-group-item d-flex justify-content-between align-items-center">
                        <img src={cartItem.imageUrl} />
                        <div>
                            <h5>{cartItem.name}</h5>

                            <div className="d-flex">
                                <button className="btn btn-primary btn-sm me-2"
                                    onClick={()=>{
                                        updateQuantity(cartItem.id, cartItem.quantity - 1)
                                    }}
                                    disabled={ cartItem.quantity <= 1}
                                >
                                    -
                                </button>    
                                Quantity: {cartItem.quantity}
                                <button 
                                    className="btn btn-primary btn-sm ms-2"
                                    onClick={()=>{
                                        updateQuantity(cartItem.id, cartItem.quantity + 1)
                                    }}
                                >+</button> 
                            </div>
                        </div>
                        <span>Per Pax: ${cartItem.price}</span>
                        <span>${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
                        <button className="btn btn-danger btn-sm" 
                            onClick={()=>{
                                removeFromCart(cartItem.id)
                            }}
                        
                        >Delete</button>
                    </li>)
                })
            }


        </ul>
        <span>Total: ${getCartTotal().toFixed(2)}</span>
        <button className="btn btn-success" onClick={async ()=>{
            const jwt = getJwt();
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + "/api/checkout", {}, {
                    headers: {
                        Authorization: 'Bearer ' + jwt
                    }
                });
                console.log(response.data);
                // redirect the user to the stripe payment page
                window.location.href = response.data.url;
            } catch (e) {
                alert("Error. Please try again later");
                console.error(e);
            }
        }}>Checkout</button>
    </div>
}