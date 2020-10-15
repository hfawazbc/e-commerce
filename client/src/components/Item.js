import React from 'react';
import '../styles/item.css';
import CartAddItem from './CartAddItem';

export default function Item({ product, isUser, userCart, setUserCart, guestCart, setGuestCart }) {
    const image = `http://localhost:5000/files/${product.images[0].filename}`;

    return (
        <div>
            <div className="item-container">    
                <h3 className="item-detail">{product.name}</h3>
                <img className="item-image item-detail" src={image} alt={product.name}/>
                <p className="item-detail">${product.price}</p>
                <CartAddItem product={product} isUser={isUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
            </div>
        </div>
    )
}
