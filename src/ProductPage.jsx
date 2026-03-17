import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "./CartStore";
import { useFlashMessage } from "./FlashMessageStore";
import { useLocation } from "wouter";

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const {addProductToCart} = useCart();
    const {showMessage} = useFlashMessage();
    const [, setLocation] = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/products");
            setProducts(response.data);

        }
        fetchProducts();
    }, [])

    return (
        <div className="container my-5">
            <h3>Product page</h3>
            <div className="row">
                {
                    products.map(p => (
                        <div className="col-md-4 mb-4" key={p.id}>
                            <ProductCard
                                productName={p.name}
                                imageUrl={p.imageUrl}
                                price={p.price}
                                handleAddToCart={()=>{
                                    addProductToCart(p);
                                    showMessage("Product has been added to cart", "success");
                                    setLocation("/cart")
                                }}
                            />
                        </div>)
                        
                    )
                }


            </div>
        </div>
    )
}