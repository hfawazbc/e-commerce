import React, { useEffect } from 'react';
import '../../styles/app.css';
import SignOut from '../user_components/SignOut';

export default function NavBarAdmin({ setUser, userCart, setUserCart }) {
    useEffect(() => {
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

    }, [setUserCart])

    return (
        <div>
            <div className="navbar-container">
                <div className="navbar-home">
                    <a className="navbar-home-link" href="/"><h1>E-commerce</h1></a>
                </div>
                <div className="navbar-dropdown">
                    <button className="navbar-dropdown-btn">Panel</button>
                    <div className="navbar-dropdown-content">
                        <a className="link" href="/post">Post Product</a> 
                        <SignOut setUser={setUser}/>
                    </div>
                </div>
                <a className="navbar-cart-link" href="/cart">View Cart: {userCart.length}</a>
            </div>
        </div>
    )
}