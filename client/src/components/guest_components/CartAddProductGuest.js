import React from 'react';
import '../../styles/app.css';

export default function CartAddProductGuest({ product, guestCart, setGuestCart }) {
    const handleClick = (e) => {
        e.preventDefault();

        let cart = guestCart.filter(item => item._id === product._id);

        if (cart.length === 0) {
            let updatedCart = [...guestCart, product];

            localStorage.setItem('cart', JSON.stringify(updatedCart));

            setGuestCart(updatedCart);
        }
    }

    return (
        <div>
            <button className="add-to-cart-btn" onClick={(e) => handleClick(e)}>Add to cart</button>
        </div>
    )
}