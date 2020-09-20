import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function CartRemoveItem({ cartItem, setUserCart, setGuestCart }) {
    const { user, findingUser } = useContext(UserContext);

    let page;

    if (findingUser === false && user === true) {
        const handleClick = (e) => {
            e.preventDefault();

            const fetchCart = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users/user/cart/remove-item', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            itemId: cartItem.item
                        }),
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

        page = (
            <div>
                <button onClick={(e) => handleClick(e)}>Remove from cart</button>
            </div>
        )
    }

    if (findingUser === false && user === false) {
        const handleRequest = (e) => {
            e.preventDefault();
    
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            let newCart = cart.filter(item => item._id !== cartItem._id);
    
            localStorage.setItem('cart', JSON.stringify(newCart));
    
            setGuestCart(newCart);
        }

        page = (
            <div>
                <button onClick={(e) => handleRequest(e)}>Remove from cart</button>
            </div>
        )
    }

    return (
        <div>
            { page }
        </div>
    )
}