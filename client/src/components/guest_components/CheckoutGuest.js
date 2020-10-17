import React from 'react';
import '../../styles/app.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function CheckoutGuest({ guestCart }) {
    const handleClick = async (e) => {
        e.preventDefault();

        const stripe = await stripePromise;

        const fetchCheckoutSession = async () => {
            try {
                const response = await fetch('users/user/cart/checkout-guest-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        guestCart
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

    return (
        <div>
            <div className="checkout-guest-container">
                <button className="checkout-btn" role="link" onClick={(e) => handleClick(e)}>Check out as guest</button>
                <a className="checkout-link" href="/sign-in">Sign in to check out</a>
            </div>
        </div>
    )
}