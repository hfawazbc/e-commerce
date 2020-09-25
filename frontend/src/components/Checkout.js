import React, { useContext } from 'react';
import '../styles/cart.css';
import { loadStripe } from '@stripe/stripe-js';
import { UserContext } from '../contexts/UserContext';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Checkout({ userCart, setUserCart, guestCart, setGuestCart }) {
    const { isUser, loading } = useContext(UserContext);

    let cart = {
        type: '',
        data: []
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!loading && !isUser) {
            cart.type = 'guest';
            cart.data = guestCart;
        } else if (!loading && isUser) {
            cart.type = 'user';
            cart.data = userCart;
        }

        const stripe = await stripePromise;

        const fetchCheckoutSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart
                    })
                })
    
                const session = await response.json();

                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                if (result.error) {
                    console.log(result.error.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchCheckoutSession();
    }

    if (!loading && !isUser) {
        return (
            <div style={{ width: '30%', margin: 'auto' }}>
                <div className="guest-checkout-container">
                    <button className="checkout-btn" role="link" onClick={(e) => handleClick(e)}>
                        Check out as guest
                    </button>
                    <a className="checkout-link" href="/sign-in">Sign in to check out</a>
                </div>
            </div>
        )
    } else if (!loading && isUser) {
        return (
            <div style={{ width: '30%', margin: 'auto' }}>
                <div className="user-checkout-container">
                    <button className="checkout-btn" role="link" onClick={(e) => handleClick(e)}>
                    Checkout
                    </button>
                </div>
            </div>
        )
    }
}