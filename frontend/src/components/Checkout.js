import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Checkout() {
    const { user, findingUser } = useContext(UserContext);

    const handleCheckout = async (e) => {
        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

    let page;

    if (findingUser === false && user === true) {
        page = (
            <button role="link" onClick={(e) => handleCheckout(e)}>
                Checkout
            </button>
        )
    }

    if (findingUser === false && user === false) {
        page = (
            <div>
                <button role="link" onClick={(e) => handleCheckout(e)}>
                    Check out as guest
                </button>

                <Link to="/sign-in">Sign in to check out</Link>
            </div>
        )
    }

    if (findingUser === true && user === false) {
        page = (
            <Loading/>
        )
    }

    return (
        <div>
            { page }
        </div>
    )
}