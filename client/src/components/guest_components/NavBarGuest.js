import React from 'react';
import '../../styles/app.css';

export default function NavBarGuest({ guestCart }) {
    return (
        <div>
            <div className="navbar-container">
                <div className="navbar-home">
                    <a className="navbar-home-link" href="/"><h1>E-commerce</h1></a>
                </div>
                <div className="navbar-dropdown">
                    <button className="navbar-dropdown-btn">Panel</button>
                    <div className="navbar-dropdown-content">
                        <a className="link" href="/sign-in">Sign in</a>
                        <a className="link" href="/register">Register</a>
                    </div>
                </div>
                <a className="navbar-cart-link" style={{ padding: '5px' }} href="/cart">View Cart: {guestCart.length}</a>
            </div>
        </div>
    )
}