import React, { useEffect } from 'react';
import '../../styles/app.css';

export default function PaymentSuccessfulGuest({ setGuestCart }) {
    useEffect(() => {        
        localStorage.clear();

        setGuestCart([]);
    }, [setGuestCart])

    return (
        <div className="component-position">
            <h1 style={{ textAlign: 'center' }}>Payment Successful!</h1>
            <div className="link-container">
                <a href="/" className="link">Return home</a>
            </div>
        </div>
    )
}
