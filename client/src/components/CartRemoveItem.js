import React, { useContext } from 'react';
import '../styles/cartItem.css';
import { UserContext } from '../contexts/UserContext';

export default function CartRemoveItem({ cartItem, setUserCart, setGuestCart }) {
    const { isUser } = useContext(UserContext);

    const handleUserClick = (e) => {
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
                
                setUserCart(data.cart);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCart();
    }
    
    const handleGuestClick = (e) => {
        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let newCart = cart.filter(item => item._id !== cartItem._id);

        localStorage.setItem('cart', JSON.stringify(newCart));

        setGuestCart(newCart);
    }


    if (!isUser) {
        return (
            <div>
                <button className="remove-btn" onClick={(e) => handleGuestClick(e)}>Remove from cart</button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="remove-btn" onClick={(e) => handleUserClick(e)}>Remove from cart</button>
            </div>
        )
    }
}