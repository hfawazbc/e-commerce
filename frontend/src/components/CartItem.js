import React, { useState } from 'react';
import CartRemoveItem from './CartRemoveItem';

export default function CartItem({ item, setClickedRemove, setClickedQuantity }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const itemQuantity = (e) => {
        if (e.target.value >= 1) {
            let cart = JSON.parse(localStorage.getItem('cart'));

            let i = 0;
            while (i < cart.length) {
                if (cart[i].id === item.id) {
                    cart[i].quantity = e.target.value;
                }

                i++;
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            setQuantity(e.target.value);

            setClickedQuantity(true);
        } else {
            setQuantity(1);
        }
    }
    
    return (
        <div>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>Subtotal: {item.price * quantity}</p>

            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" type="number" value={quantity} onChange={(e) => itemQuantity(e)} />

            <CartRemoveItem item={item} setClickedRemove={setClickedRemove} />
        </div>
    )
}
