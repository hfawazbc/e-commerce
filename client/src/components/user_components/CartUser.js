import React, { useEffect } from 'react';
import '../../styles/app.css';
import CartProduct from '../general_components/CartProduct';
import CheckoutUser from '../user_components/CheckoutUser';

export default function CartUser({ user, userCart, setUserCart }) {
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
            <div className="cart-container">
                {userCart.map(product => {
                    return <CartProduct key={product._id} user={user} product={product} setUserCart={setUserCart}/>
                })}
                {userCart.length > 0 ? <CheckoutUser userCart={userCart}/> : <h3 style={{ textAlign: 'center' }}>Your cart is empty.</h3>}
            </div>
        </div>
    )
}