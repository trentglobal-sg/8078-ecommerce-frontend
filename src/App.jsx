import { Route, Switch} from 'wouter';

import "./App.css";
import HomePage from "./HomePage";
import RegisterPage from './RegisterPage';
import ProductPage from './ProductPage';
import LoginPage from './LoginPage';
import ShoppingCart from './ShoppingCart';

import Navbar from "./Navbar";
import FlashMessage from './FlashMessage';
import Profile from './Profile';


export default function App() {
  return (
    <>
      <Navbar/>
      <FlashMessage/>
      <Switch>
        <Route path="/" component={HomePage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/products" component={ProductPage}/>
        <Route path="/cart" component={ShoppingCart}/>
        <Route path="/profile" component={Profile}/>
      </Switch>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2023 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}