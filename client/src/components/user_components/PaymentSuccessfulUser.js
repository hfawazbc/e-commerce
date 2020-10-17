import React, { useEffect } from 'react';
import '../../styles/app.css';

export default function PaymentSuccessfulUser({ setUserCart }) {
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/user/empty-cart', {
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
    }, [setUserCart])

    return (
        <div className="component-position">
            <h2 style={{ textAlign: 'center' }}>Payment Successful!</h2>
            <div className="link-container">
                <a href="/" className="link">Return home</a>
            </div>
        </div>
    )
}
