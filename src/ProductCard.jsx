// 1. A component is a function
// 2. The first alphabet of the function is upper case
// 3. It must return JSX
// A component function can accept an object as props
// Props must be in the first parameter in the function
// The keys in the props are set by the parent component
export default function ProductCard(props) {

    const handleAddToCart = () => {
        alert("Add to cart is pressed")
    }

    return (
        <div className="card">
            <img
                src={props.imageUrl}
                className="card-img-top"
                alt="Product 1"
            />
            <div className="card-body">
                <h5 className="card-title">{props.productName}</h5>
                <p className="card-text">${props.price}</p>
                <a href="#" className="btn btn-primary" onClick={props.handleAddToCart}>Add to Cart</a>
            </div>
        </div>
    )
}