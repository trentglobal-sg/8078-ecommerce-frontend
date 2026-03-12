import { useCart } from "./CartStore"

export default function ShoppingCart() {
    const { cart } = useCart();
    
    return <div className="container">
        <h3>Shopping Cart</h3>
        <ul className="list-group">

            {
                cart.map((cartItem) => {
                    return (<li className="list-group-item d-flex justify-content-between align-items-center">
                        <img src={cartItem.imageUrl} />
                        <div>
                            <h5>{cartItem.name}</h5>
                            <p>Quantity: {cartItem.quantity}</p>
                        </div>
                        <span>${cartItem.price}</span>
                    </li>)
                })
            }


        </ul>
    </div>
}