import React, { useEffect, useState } from 'react';
import GuestCheckout from './GuestCheckout';
import CartItem from './CartItem';

export default function Cart({ clickedRemove, setClickedRemove, clickedQuantity, setClickedQuantity }) {
    useEffect(() => {    
        if (clickedRemove === true) {
            setClickedRemove(false);
        }
    }, [clickedRemove, setClickedRemove])

    useEffect(() => {    
        if (clickedQuantity === true) {
            setClickedQuantity(false);
        }
    }, [clickedQuantity, setClickedQuantity])

    const [total, setTotal] = useState(0);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    useEffect(() => {
        let sum = 0;

        if (cart.length === 0) {
            setTotal(0);
        } else {
            let i = 0;
            while (i < cart.length) {
                sum = sum + cart[i].price * cart[i].quantity;
        
                setTotal(sum);
        
                i++;
            }
        }
    }, [cart])

    return (
        <div>
            {cart.map(item => {
                return <CartItem key={item.id} item={item} setClickedRemove={setClickedRemove} setClickedQuantity={setClickedQuantity} />
            })}
            <div>
                {total > 0 ? <h3>Total {total}</h3> : <h3>Cart is empty.</h3>}
            </div>

            <GuestCheckout />
        </div>
    )
}
