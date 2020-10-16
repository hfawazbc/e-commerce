import React, { useEffect } from 'react';
import '../styles/app.css';

export default function PaymentSuccessful({ isUser, setUserCart, setGuestCart }) {
    useEffect(() => {
        if (isUser) {
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
        } else {
            localStorage.clear();
    
            setGuestCart([]);
        }
    }, [isUser, setUserCart, setGuestCart])

    return (
        <div className="center-component">
            <h1 style={{ textAlign: 'center' }}>Payment Successful!</h1>
            <div className="link-container">
                <a href="/" className="link">Return home</a>
            </div>
        </div>
    )
}
