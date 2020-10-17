import React from 'react';
import '../../styles/app.css';

export default function CartRemoveProductGuest({ product, guestCart, setGuestCart }) {   
    const handleClick = (e) => {
        e.preventDefault();

        let cart = guestCart.filter(item => item._id !== product._id);

        localStorage.setItem('cart', JSON.stringify(cart));

        setGuestCart(cart);
    }

    return (
        <div>
            <button className="remove-from-cart-btn" onClick={(e) => handleClick(e)}>Remove from cart</button>
        </div>
    )
}