import React, { useEffect } from 'react';

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
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h1>Payment Successful!</h1>
            <div style={{ textAlign: 'center' }}>
                <a href="/" style={{ textDecoration: 'none', color: '#03A9F4' }}>Return home</a>
            </div>
        </div>
    )
}
