import { atom, useAtom } from 'jotai';
import { useJwt } from './UserStore';
import axios from 'axios';

const initialCart = [

];

const cartAtom = atom(initialCart);

export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const {getJwt} = useJwt();

    const fetchCart = async() => {
        const jwt = getJwt();
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/cart",{
                'headers': {
                    'Authorization': 'Bearer ' + jwt
                }
            })
            setCart(response.data);
        } catch (e) {
            console.error("Error fetching cart:", error);
        }
    }

    const updateCart = async(updatedCart) => {
        const jwt = getJwt();
        try {
            const cartItems = updatedCart.map(item => {
                return {
                    product_id: item.product_id,
                    quantity: item.quantity
                }
            });

            await axios.put(import.meta.env.VITE_API_URL + '/api/cart', {
                cartItems: cartItems
            },{
                'headers': {
                    'Authorization':'Bearer ' + jwt
                }
            })

        } catch(e) {
            console.error(e);
        }
    }

    const getCartTotal = () => {
        let total = 0;
        for (let cartItem of cart) {
            total += cartItem.price * cartItem.quantity;
        }
        return total;
    }

    const addProductToCart = (product) => {

        // check if the product in the shopping cart
        const existingIndex = cart.findIndex(cartItem => cartItem.product_id === product.id);

        // if not found, add as a new cart item
        if (existingIndex === -1) {
            const newCartItem = {
                id: Math.floor(Math.random() * 10000 + 1),
                product_id: product.id,
                imageUrl: product.imageUrl,
                description: product.description,
                name: product.name,
                quantity: 1,
                price: product.price
            }
            const cloned = [...cart, newCartItem];
            setCart(cloned);
            updateCart(cloned);
        } else {
            const existingCartItem = cart[existingIndex];
            const clonedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            }

            const cloned = cart.with(existingIndex, clonedCartItem);
            setCart(cloned);
            updateCart(cloned);
        }


    }

    const removeFromCart = (cartItemId) => {
        const indexToRemove = cart.findIndex(c => c.id === cartItemId);
        if (indexToRemove !== -1) {
            const cloned = cart.toSpliced(indexToRemove, 1);
            setCart(cloned);
            updateCart(cloned);
        }
    }

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity <= 0) {
            return;
        }
        const indexToUpdate = cart.findIndex(c => c.id === cartItemId);
        console.log(indexToUpdate)
        if (indexToUpdate !== -1) {
            const modifiedCartItem = {
                ...cart[indexToUpdate],
                quantity: newQuantity
            }
    
            // const cloned = cart.toSpliced(indexToUpdate, 1,  modifiedCartItem);
            const cloned = cart.with(indexToUpdate, modifiedCartItem);
            setCart(cloned);
            updateCart(cloned);
        }
    }

    return { cart, getCartTotal, addProductToCart, removeFromCart, updateQuantity,fetchCart, updateCart };
}