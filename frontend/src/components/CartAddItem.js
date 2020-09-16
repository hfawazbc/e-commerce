import React from 'react';

export default function CartAddItem({ product, setClickedAdd }) {
    const handleRequest = (e) => {
        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = localStorage.getItem('count') || 0;

        let i = 0;
        let found = false;
        while (i < cart.length && found !== true) {
            if (cart[i].id === product._id) {
                found = true;
                alert('Item is already in cart.');
            }

            i++;
        }

        if (found === false) {
            const countKey = 'count';
            const countValue = +count + 1;
            localStorage.setItem(countKey, countValue);

            let item = {
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: 1,
                images: product.images,
            }

            cart.push(item);

            const cartKey = 'cart';
            const cartValue = JSON.stringify(cart);
            localStorage.setItem(cartKey, cartValue);
        }

        setClickedAdd(true);
    }

    return (
        <div>
            <button onClick={(e) => handleRequest(e)}>Add to cart</button>
        </div>
    )
}
