import React from 'react';
import '../styles/app.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Checkout({ isUser, userCart, guestCart }) {
    const handleClick = async (e) => {
        e.preventDefault();

        let cartData;
        let cartType;

        if (!isUser) {
            cartType = 'guest';
            cartData = guestCart;
        } else {
            cartType = 'user';
            cartData = userCart;
        }

        const stripe = await stripePromise;

        const fetchCheckoutSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/user/cart/checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cartType,
                        cartData
                    })
                })
    
                const data = await response.json();

                const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

                if (result.error) console.log(result.error.message);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCheckoutSession();
    }

    if (!isUser) {
        return (
            <div>
                <button className="checkout-btn" role="link" onClick={(e) => handleClick(e)}>Check out as guest</button>
                <a className="checkout-link" href="/sign-in">Sign in to check out</a>
                
            </div>
        )
    } else {
        return (
            <div>
                <button className="checkout-btn" role="link" onClick={(e) => handleClick(e)}>Checkout</button>
            </div>
        )
    }
}