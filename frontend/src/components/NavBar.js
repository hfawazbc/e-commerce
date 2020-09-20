import React, { useEffect, useContext, useState } from 'react';
import '../styles/navBar.css';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';

import shoppingCart from '../icons/shopping-cart.png';

export default function NavBar({ userCart, setUserCart, guestCart, setGuestCart }) {
    const { findingUser, user } = useContext(UserContext);
    const [findingCart, setFindingCart] = useState(true);

    useEffect(() => {
        if (findingUser === false && user === true) {
            const fetchCart = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users/user/cart', {
                        method: 'GET',
                        credentials: 'include'
                    })

                    if (findingCart) {
                        const data = await response.json();

                        setUserCart(data.user.cart);                    
                    }

                    setFindingCart(false);
                } catch (error) {
                    console.log(error);
                }
            }

            fetchCart();
        }

    }, [findingUser, user, findingCart, setUserCart])

    let page;

    if (!findingUser && user) {
        if (!findingCart) {
            page = (
                <div className="user-navbar-container">
                    <h3>E-commerce</h3>
                    <div>
                        <a className="navbar-link" href="/sign-out">Sign out</a>
                    </div>
                    <div>
                        <a className="navbar-link" href="/cart" className="cart-container">
                            <img className="cart-image" src={shoppingCart} alt=""/>
                            <p className="cart-count">{userCart.length}</p>
                        </a>
                    </div>
                </div>
            )
        } else {
            page = (
                <Loading/>
            )
        }
    }

    if (!findingUser && !user) {
        page = (
            <div className="guest-navbar-container">
                <h3>E-commerce</h3>
                <div>
                    <a className="navbar-link" href="/register">Register</a>
                </div>
                <div>
                    <a className="navbar-link" href="/sign-in">Sign in</a>
                </div>
                <div>
                    <a className="navbar-link" href="/cart" className="cart-container">
                        <img className="cart-image" src={shoppingCart} alt=""/>
                        <p className="cart-count">{guestCart.length}</p>
                    </a>
                </div>
            </div>
        )
    }

    if (findingUser && !user) {
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