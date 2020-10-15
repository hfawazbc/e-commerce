import React, { useEffect } from 'react';
import '../styles/navBar.css';
import shoppingCart from '../icons/shopping-cart.png';
import SignOut from './SignOut';

export default function NavBar({ isUser, setIsUser, userCart, setUserCart, guestCart }) {
    useEffect(() => {
        if (isUser) {
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

    }, [isUser, setUserCart])

    if (isUser) {
        return (
            <div>
                <div className="navbar-container">
                    <a className="navbar-link" href="/"><h3>E-commerce</h3></a>
                    <SignOut isUser={isUser} setIsUser={setIsUser}/>
                    <div>
                        <a className="navbar-cart-container" href="/cart" >
                            <img className="navbar-cart-image" src={shoppingCart} alt=""/>
                            <p className="navbar-cart-count">{userCart.length}</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    } else {
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