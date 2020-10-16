import React from 'react';
import '../styles/app.css';
import CartAddItem from './CartAddItem';

export default function Item({ product, isUser, userCart, setUserCart, guestCart, setGuestCart }) {
    const image = `http://localhost:5000/files/${product.images[0].filename}`;

    return (
        <div>
            <div className="product-container">    
                <h2 style={{ marginBottom: '15px' }}>{product.name}</h2>
                <img className="product-image" style={{ marginBottom: '15px' }} src={image} alt={product.name}/>
                <p style={{ marginBottom: '15px' }}>${product.price}</p>
                <CartAddItem product={product} isUser={isUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
            </div>
        </div>
    )
}
