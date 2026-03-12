import { atom, useAtom } from 'jotai';

const initialCart = [
    {
        "id": 1,
        "product_id": 1,
        "quantity": 10,
        "name": "Organic Green Tea",
        "price": 12.99,
        "imageUrl":"https://picsum.photos/id/225/300/200",
        "description":"Premium organic green tea leaves, rich in antioxidants and offering a smooth, refreshing taste."
    },
    {
        "id": 2,
        "product_id": 2,
        "quantity": 19,
        "name": "Roasted Black Tea",
        "price": 15.99,
        "imageUrl":"https://picsum.photos/id/225/300/200",
        "description":"Premium organic green tea leaves, rich in antioxidants and offering a smooth, refreshing taste."
    }
];

const cartAtom = atom(initialCart);

export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    const getCartTotal = () => {
        let total = 0;
        for (let cartItem of cart) {
            total += cartItem.price;
        }
        return total;
    }

    return {cart, getCartTotal};
}