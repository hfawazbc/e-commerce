import React, { useEffect } from 'react';
import '../../styles/app.css';
import SignOut from './SignOut';

export default function NavBarUser({ setUser, userCart, setUserCart }) {
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('users/user/cart', {
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
                    <a className="navbar-home-link" href="/"><h2>E-commerce</h2></a>
                </div>
                <div className="navbar-dropdown">
                    <button className="navbar-dropdown-btn">Panel</button>
                    <div className="navbar-dropdown-content"> 
                        <SignOut setUser={setUser}/>
                    </div>
                </div>
                <a className="navbar-cart-link" href="/cart">Cart: {userCart.length}</a>
            </div>
        </div>
    )
}