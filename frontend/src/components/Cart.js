import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Loading from './Loading';

export default function Cart({ userCart, setUserCart, guestCart, setGuestCart }) {
    const { user, findingUser } = useContext(UserContext);

    const [findingCart, setFindingCart] = useState(true);
    
    useEffect(() => {
        if (findingUser === false && user === true) {
            const fetchCart = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users/user/cart', {
                        method: 'GET',
                        credentials: 'include'
                    })
        
                    if (findingCart === true) {
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
    
    if (findingUser === false && user === true) {
        if (findingCart === false) {
            page = (
                <div>
                    {userCart.map(cartItem => {
                        return <CartItem key={cartItem._id} cartItem={cartItem} setUserCart={ setUserCart }/>
                    })}

                    <div>
                        {userCart.length > 0 ? <div><h1>Total: 000</h1><Link to="/">Return to home page</Link><Checkout/></div> : <div><h1>Your cart is empty.</h1><Link to="/">Return to home page</Link></div>}
                    </div>
                </div>
            )
        } 

        if (findingCart === true) {
            page = (
                <Loading/>
            )
        }
    }

    if (findingUser === false && user === false) {
        page = (
            <div>
                {guestCart.map(cartItem => {
                    return <CartItem key={cartItem._id} cartItem={cartItem} setGuestCart={setGuestCart}/>
                })}

                <div>
                    {guestCart.length > 0 ? <div><h1>Total 000</h1><Link to="/">Return to home page</Link><Checkout/></div> : <div><h1>Your cart is empty.</h1><Link to="/">Return to home page</Link></div>}
                </div>
            </div>
        )
    }

    if (findingUser === true && user === false) {
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