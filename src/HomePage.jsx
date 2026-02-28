import axios from "axios";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard"

export default function HomePage() {


    const [featuredProducts, setFeaturedProducts] = useState([]);

    // if useEffect is called with an empty array, then the effect
    // function will ONLY run when the component mounted (i.e the component
    // is rendered for the first time)
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            // when we refer to a static asset (images, css files, vanilla JS file, json) in React
            // React will assume it is in the public folder
            const response = await axios.get("/featured.json");
            setFeaturedProducts(response.data);
        }
        fetchFeaturedProducts();
    }, [])

    return (
        <>
            <header className="bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4">Welcome to E-Shop</h1>
                    <p className="lead">Discover amazing products at unbeatable prices!</p>
                    <a href="#" className="btn btn-light btn-lg">Shop Now</a>
                </div>
            </header>
            <main className="container my-5">
                <h2 className="text-center mb-4">Featured Products</h2>

                <div className="row">
                    {
                        featuredProducts.map((product) => {
                            return (<div className="col-md-3 mb-4" key={product.id}>
                                <ProductCard
                                    imageUrl={product.imageUrl}
                                    productName={product.name}
                                    price={product.price}
                                />
                            </div>
                            )
                        })
                    }

                </div>
            </main>
        </>
    )
}