import React, { useContext } from 'react';
import '../styles/cartItem.css';
import { UserContext } from '../contexts/UserContext';
import CartRemoveItem from './CartRemoveItem';

export default function CartItem({ cartItem, setUserCart, setGuestCart}) {
    const { isUser } = useContext(UserContext);

    let item = null;

    if (isUser) {
        item = cartItem.item;
    }

    if (!isUser) {
        item = cartItem;
    }
    
    return (
        <div>
            <div className="cart-item-container">
                <h3 className="cart-item-detail">{item.title}</h3>
                <p className="cart-item-detail">${item.price}</p>

                <CartRemoveItem cartItem={cartItem} setUserCart={ setUserCart } setGuestCart={setGuestCart}/>
            </div>
        </div>
    )
}
