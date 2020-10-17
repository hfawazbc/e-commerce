import React from 'react';
import '../../styles/app.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function CheckoutUser({ userCart }) {
    const handleClick = async (e) => {
        e.preventDefault();

        const stripe = await stripePromise;

        const fetchCheckoutSession = async () => {
            try {
                const response = await fetch('users/user/cart/checkout-user-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userCart
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
            <button className="checkout-btn" role="link" onClick={(e) => handleClick(e)}>Checkout</button>
        </div>
    )    
}