import React from 'react';
import '../styles/app.css';
import CartRemoveItem from './CartRemoveItem';

export default function CartItem({ cartItem, isUser, setUserCart, guestCart, setGuestCart}) {
    const image = `http://localhost:5000/files/${cartItem.images[0].filename}`;
    
    return (
        <div>
            <div className="product-container">
                <h2 style={{ marginBottom: '15px' }}>{cartItem.name}</h2>
                <img className="product-image" style={{ marginBottom: '15px' }} src={image} alt={cartItem.name}/>
                <p style={{ marginBottom: '15px' }}>${cartItem.price}</p>
                <CartRemoveItem cartItem={cartItem} isUser={isUser} setUserCart={ setUserCart } guestCart={guestCart} setGuestCart={setGuestCart}/>
            </div>
        </div>
    )
}
