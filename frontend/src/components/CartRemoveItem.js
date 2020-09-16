import React from 'react';

export default function CartRemoveItem({ item, setClickedRemove }) {
    const handleRequest = (e) => {
        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let count = localStorage.getItem('count');

        let i = 0;
        let found = false;
        while (i < cart.length && found !== true) {
            if (cart[i].id === item.id) {
                found = true;
                let updatedCount = +count - 1;
                localStorage.setItem('count', updatedCount);
            }

            i++;
        }

        let updatedCart = cart.filter(cartItem => cartItem.id !== item.id);

        localStorage.setItem('cart', JSON.stringify(updatedCart));

        alert("Removed item from cart.")

        setClickedRemove(true);
    }

    return (
        <div>
            <button onClick={(e) => handleRequest(e)}>Remove from cart</button>
        </div>
    )
}
