import React, { useEffect, useContext } from 'react';
import '../styles/navBar.css';
import shoppingCart from '../icons/shopping-cart.png';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';
import SignOut from './SignOut';

export default function NavBar({ userCart, setUserCart, guestCart, setGuestCart }) {
    const { isUser, loading } = useContext(UserContext);

    useEffect(() => {
        if (!loading && isUser) {
            const fetchCart = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users/user/cart', {
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
        }

    }, [loading, isUser, setUserCart])

    if (loading) {
        return (
            <Loading/>
        )
    } else if (!loading && isUser) {
        return (
            <div>
                <div className="navbar-container">
                    <a className="navbar-link" href="/"><h3>E-commerce</h3></a>
                    <SignOut/>
                    <div>
                        <a className="navbar-cart-container" href="/cart" >
                            <img className="navbar-cart-image" src={shoppingCart} alt=""/>
                            <p className="navbar-cart-count">{userCart.length}</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    } else if (!loading && !isUser) {
        return (
            <div>
                <div className="navbar-container">
                    <a className="navbar-home navbar-link" href="/"><h3>E-commerce</h3></a>
                    <div className="navbar-session">
                        <a className="navbar-link" href="/sign-in">Sign in</a> | <a className="navbar-link" href="/register">Register</a>
                    </div>
                    <div>
                        <a className="navbar-cart-container" href="/cart" >
                            <img className="navbar-cart-image" src={shoppingCart} alt=""/>
                            <p className="navbar-cart-count">{guestCart.length}</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}