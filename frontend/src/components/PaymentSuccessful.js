import React from 'react';
import { Link } from 'react-router-dom';

export default function PaymentSuccessful() {
    return (
        <div>
            Payment successful.
            Payment cancelled.
            <Link to="/">Return to home page</Link>
        </div>
    )
}
