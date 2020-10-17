import React from 'react';
import '../../styles/app.css';
import CartProduct from '../general_components/CartProduct';
import CheckoutGuest from '../guest_components/CheckoutGuest';

export default function CartGuest({ user, guestCart, setGuestCart }) {
    return (
        <div>
            <div className="cart-container">
                {guestCart.map(product => {
                    return <CartProduct key={product._id} user={user} product={product} guestCart={guestCart} setGuestCart={setGuestCart}/>
                })}
                {guestCart.length > 0 ? <CheckoutGuest guestCart={guestCart} /> : <h3 style={{ textAlign: 'center' }}>Your cart is empty.</h3>}
            </div>
        </div>
    )
}