import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import CartRemoveItem from './CartRemoveItem';

export default function CartItem({ cartItem, setUserCart, setGuestCart}) {
    const { findingUser, user } = useContext(UserContext);

    let page;

    if (!findingUser && user) {
        page = (
            <div>
                <p>{cartItem.item.title}</p>
                <p>{cartItem.item.price}</p>
                <p>Subtotal 000</p>

                {/* <label htmlFor="quantity">Quantity</label>
                <input id="quantity" type="number" value={quantity} onChange={() => console.log('Changed quantity.')}/> */}

                <CartRemoveItem cartItem={cartItem} setUserCart={ setUserCart } setGuestCart={setGuestCart} />
            </div>
        )
    }

    if (!findingUser && !user) {
        page = (
            <div>
                <p>{cartItem.title}</p>
                <p>{cartItem.price}</p>
                <p>Subtotal 000</p>

                {/* <label htmlFor="quantity">Quantity</label>
                <input id="quantity" type="number" value={quantity} onChange={() => console.log('Changed quantity.')}/> */}

                <CartRemoveItem cartItem={cartItem} setUserCart={ setUserCart } setGuestCart={setGuestCart} />
            </div>
        )
    }
    
    return (
        <div>
            { page }
        </div>
    )
}
