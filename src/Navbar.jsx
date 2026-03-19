import { useState } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {

    // create a state using useState
    // the useState function returns an array
    // the first element in the array is the value of the state
    // the second element in the array is a function that let us change the state
    // the parameter to the function is the default value of the state
    const [isNavbarShowing, setIsNavbarShowing] = useState(false);

    // location will contain the current URL of the application
    const [location] = useLocation();

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <a className="navbar-brand" href="#">E-Shop</a>
            <button
                className="navbar-toggler"
                type="button"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => {
                    if (isNavbarShowing) {
                        setIsNavbarShowing(false);
                    } else {
                        setIsNavbarShowing(true);
                    }
                }}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location === "/" ? 'active' : ''}`} href="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location === "/products" ? 'active' : ''}`} href="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location === "/register" ? 'active' : ''}`} href="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location === "/login" ? 'active' : ''}`} href="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location === "/cart" ? 'active' : ''}`} href="/cart">Cart</Link>
                    </li>
                     <li className="nav-item">
                        <Link className={`nav-link ${location === "/profile" ? 'active' : ''}`} href="/profile">Profile</Link>
                    </li>

                </ul>
            </div>
        </div>
    </nav>)
}