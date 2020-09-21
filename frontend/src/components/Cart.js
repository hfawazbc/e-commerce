import React, { useContext, useEffect } from 'react';
import '../styles/cart.css';
import { UserContext } from '../contexts/UserContext';
import CartItem from './CartItem';
import Loading from './Loading';
import NavBar from './NavBar';
import Checkout from './Checkout';

export default function Cart({ userCart, setUserCart, guestCart, setGuestCart }) {
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
    
    if (!loading && isUser) {
        cart = userCart;
    }

    if (!loading && !isUser) {
        cart = guestCart;
    }

    if (loading) {
        return (
            <div>
                <Loading/>
            </div>
        )
    }
    
    if (!loading) {
        return (
            <div>
                <NavBar userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
                <div style={{ width: '30%', margin: 'auto' }}>
                    <div className="cart-main-container">
                        <h1 className="cart-main-header">Your cart</h1>
                        {cart.map(cartItem => {
                            return <CartItem key={cartItem._id} cartItem={cartItem} setUserCart={ setUserCart } setGuestCart={setGuestCart}/>
                        })}
                    </div>
                </div>
                <div className="cart-checkout">
                    <Checkout guestCart={guestCart} setGuestCart={setGuestCart} userCart={userCart} setUserCart={setUserCart}/>
                </div>
            </div>
        )
    }
}