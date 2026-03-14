import { atom, useAtom } from 'jotai';

const initialCart = [

];

const cartAtom = atom(initialCart);

export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

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
        } else {
            const existingCartItem = cart[existingIndex];
            const clonedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            }

            const cloned = cart.with(existingIndex, clonedCartItem);
            setCart(cloned);
        }


    }

    const removeFromCart = (cartItemId) => {
        const indexToRemove = cart.findIndex(c => c.id === cartItemId);
        if (indexToRemove !== -1) {
            const cloned = cart.toSpliced(indexToRemove, 1);
            setCart(cloned);
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
            console.log(modifiedCartItem);
            // const cloned = cart.toSpliced(indexToUpdate, 1,  modifiedCartItem);
            const cloned = cart.with(indexToUpdate, modifiedCartItem);
            setCart(cloned);
        }
    }

    return { cart, getCartTotal, addProductToCart, removeFromCart, updateQuantity };
}