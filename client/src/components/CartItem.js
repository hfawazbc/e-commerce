import React from 'react';
import '../styles/cartItem.css';
import CartRemoveItem from './CartRemoveItem';

export default function CartItem({ cartItem, isUser, setUserCart, setGuestCart}) {
    const image = `http://localhost:5000/files/${cartItem.images[0].filename}`;
    
    return (
        <div>
            <div className="cart-item-container">
                <h3 className="cart-item-detail">{cartItem.name}</h3>
                <img className="cart-item-image cart-item-detail" src={image} alt={cartItem.name}/>
                <p className="cart-item-detail">${cartItem.price}</p>
                <CartRemoveItem cartItem={cartItem} isUser={isUser} setUserCart={ setUserCart } setGuestCart={setGuestCart}/>
            </div>
        </div>
    )
}
