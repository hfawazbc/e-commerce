import React, { useEffect } from 'react';
import '../styles/app.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

export default function Cart({ isUser, userCart, setUserCart, guestCart, setGuestCart }) {
    useEffect(() => {
        if (isUser) {
            const fetchCart = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users/user/cart', {
                        method: 'GET',
                        credentials: 'include'
                    })
                    
                    const data = await response.json();

                    setUserCart(data.cart);
                } catch (error) {
                    console.log(error);
                }
            }

            fetchCart();
        }

    }, [isUser, setUserCart])

    let cart = [];
    
    if (isUser) cart = userCart;
    if (!isUser) cart = guestCart;

    return (
        <div>
            <div className="cart-container">
                {cart.map(cartItem => {
                    return <CartItem key={cartItem._id} cartItem={cartItem} isUser={isUser} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
                })}
                { cart.length > 0 ? 
                    <Checkout isUser={isUser} userCart={userCart} guestCart={guestCart} />
                :
                    <h1 style={{ textAlign: 'center' }}>Your cart is empty.</h1>
                }
            </div>
        </div>
    )
}