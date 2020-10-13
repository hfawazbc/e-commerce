import React from 'react';
import { Link } from 'react-router-dom';

export default function PaymentCancelled() {
    return (
        <div>
            Payment cancelled.
            <Link to="/">Return to home page</Link>
        </div>
    )
}
