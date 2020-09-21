import React from 'react';
import ItemList from './ItemList';
import NavBar from './NavBar';

export default function Home({ userCart, setUserCart, guestCart, setGuestCart }) {
    return (
        <div>
            <NavBar userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
            <ItemList userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
        </div>
    )
}
