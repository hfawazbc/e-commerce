import React, { useEffect, useContext } from 'react';
import '../styles/navBar.css';
import shoppingCart from '../icons/shopping-cart.png';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';

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

                    setUserCart(data.user.cart);
                } catch (error) {
                    console.log(error);
                }
            }

            fetchCart();
        }

    }, [loading, isUser, setUserCart])

    let cart = [];
    let link = null;

    if (isUser) {
        cart = userCart;

        link = (
            <div>
                <a className="navbar-link" href="/sign-out">Sign out</a>
            </div>
        )
    }

    if (!isUser) {
        cart = guestCart;

        link = (
            <div>
               <a className="navbar-link" href="/sign-in">Sign in</a> | <a className="navbar-link" href="/register">Register</a>
            </div>
        )
    }

    if (loading) {
        return (
            <Loading/>
        )
    } 
    
    if (!loading) {
        return (
            <div>
                <div className="user-navbar-container">
                    <a className="navbar-link" href="/"><h3>E-commerce</h3></a>
                    { link }
                    <div>
                        <a className="navbar-cart-container" href="/cart" >
                            <img className="navbar-cart-image" src={shoppingCart} alt=""/>
                            <p className="navbar-cart-count">{cart.length}</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}