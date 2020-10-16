import React, { useEffect } from 'react';
import '../styles/app.css';
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
                    <div className="navbar-home">
                        <a className="navbar-home-link" href="/"><h1>E-commerce</h1></a>
                    </div>
                    <div className="navbar-dropdown">
                        <button className="navbar-dropdown-btn">Menu</button>
                        <div className="navbar-dropdown-content">
                            <a style={{ padding: '5px' }} className="link" href="/post">Post Product</a> 
                            <SignOut isUser={isUser} setIsUser={setIsUser}/>
                        </div>
                    </div>
                    <div className="link-container">
                        <a className="link" style={{ padding: '5px' }} href="/cart" >View Cart: {userCart.length}</a>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="navbar-container">
                    <div className="navbar-home">
                        <a className="navbar-home-link" href="/"><h1>E-commerce</h1></a>
                    </div>
                    <div className="navbar-dropdown">
                        <button className="navbar-dropdown-btn">Menu</button>
                        <div className="navbar-dropdown-content">
                            <a style={{ padding: '5px' }} className="link" href="/sign-in">Sign in</a>
                            <a style={{ padding: '5px' }} className="link" href="/register">Register</a>
                        </div>
                    </div>
                    <div className="link-container">
                        <a className="link" style={{ padding: '5px' }} href="/cart" >View Cart: {guestCart.length}</a>
                    </div>
                </div>
            </div>
        )
    }
}