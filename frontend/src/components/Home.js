import React from 'react';
import '../styles/home.css';
import ItemList from './ItemList';
import NavBar from './NavBar';

export default function Home({ userCart, setUserCart, guestCart, setGuestCart }) {
    return (
        <div>
            <NavBar userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
            <h1 className="home-header">Products</h1>
            <ItemList userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
        </div>
    )
}