import React, { useEffect } from 'react';
import '../styles/cart.css';
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
            <div style={{ width: '30%', margin: 'auto' }}>
                <div className="cart-main-container">
                    <h1 className="cart-primary-header">Your Cart</h1>
                    {cart.map(cartItem => {
                        return <CartItem key={cartItem._id} cartItem={cartItem} isUser={isUser} setUserCart={setUserCart} setGuestCart={setGuestCart}/>
                    })}
                </div>
            </div>
            { cart.length > 0 ? 
                <div className="cart-checkout">
                    <Checkout guestCart={guestCart} setGuestCart={setGuestCart} userCart={userCart} setUserCart={setUserCart}/>
                </div>
            :
                <h2 className="cart-secondary-header">Your cart is empty.</h2>
            }
        </div>
    )
}