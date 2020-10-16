import React from 'react';
import '../styles/app.css';

export default function CartAddItem({ product, isUser, setUserCart, guestCart, setGuestCart }) {
    const handleUserClick = (e) => {
        e.preventDefault();

        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/user/cart/add-item', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itemId: product._id
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

        let cart = guestCart.filter(item => item._id === product._id);

        if (cart.length === 0) {
            let updatedCart = [...guestCart, product];

            localStorage.setItem('cart', JSON.stringify(updatedCart));

            setGuestCart(updatedCart);
        }
    }

    if (!isUser) {
        return (
            <div>
                <button className="add-to-cart-btn" onClick={(e) => handleGuestClick(e)}>Add to cart</button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="add-to-cart-btn" onClick={(e) => handleUserClick(e)}>Add to cart</button>
            </div>
        )
    }
}
