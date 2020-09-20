import React from 'react';
import '../styles/item.css';
import CartAddItem from './CartAddItem';

export default function Item({ product, userCart, setUserCart, guestCart, setGuestCart }) {
    return (
        <div>
            <div className="item-container">
                <h3 className="item-detail">{product.title}</h3>
                <p className="item-detail">{product.description}</p>
                <p className="item-detail">${product.price}</p>
                <CartAddItem product={product} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
            </div>
        </div>
    )
}
