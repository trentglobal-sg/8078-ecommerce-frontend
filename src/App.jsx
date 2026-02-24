import "./App.css";
import ProductCard from "./ProductCard";
import { useState } from 'react';

export default function App() {

  // create a state using useState
  // the useState function returns an array
  // the first element in the array is the value of the state
  // the second element in the array is a function that let us change the state
  // the parameter to the function is the default value of the state
  const [isNavbarShowing, setIsNavbarShowing] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>



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
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/20/300/200"
              productName="Product 1"
              price={19.99}
            />
          </div>
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/21/300/200"
              productName="Product 2"
              price={21.99}
            />
          </div>
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/22/300/200"
              productName="Product 3"
              price={13.99}
            />
          </div>
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/23/300/200"
              productName="Product 4"
              price={15.99}

            />
          </div>
        </div>
      </main>
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2023 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}