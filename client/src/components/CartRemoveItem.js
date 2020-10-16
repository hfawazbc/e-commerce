import React from 'react';
import '../styles/app.css';

export default function CartRemoveItem({ cartItem, isUser, setUserCart, guestCart, setGuestCart }) {
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
                        itemId: cartItem._id
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

        let cart = guestCart.filter(item => item._id !== cartItem._id);

        localStorage.setItem('cart', JSON.stringify(cart));

        setGuestCart(cart);
    }


    if (!isUser) {
        return (
            <div>
                <button className="remove-from-cart-btn" onClick={(e) => handleGuestClick(e)}>Remove from cart</button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="remove-from-cart-btn" onClick={(e) => handleUserClick(e)}>Remove from cart</button>
            </div>
        )
    }
}