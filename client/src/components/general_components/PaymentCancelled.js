import React from 'react';
import '../../styles/app.css';

export default function PaymentCancelled() {
    return (
        <div className="component-position">
            <h2 style={{ textAlign: 'center' }}>Payment Cancelled.</h2>
            <div className="link-container">
                <a href="/" className="link">Return home</a>
            </div>
        </div>
    )
}
