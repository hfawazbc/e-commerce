import React, { useContext } from 'react';
import '../styles/item.css';
import { UserContext } from '../contexts/UserContext';

export default function CartAddItem({ product, userCart, setUserCart, guestCart, setGuestCart }) {
    const { isUser } = useContext(UserContext);

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

                if (!data.isAdded) {
                    alert(data.message);
                }

                setUserCart(data.cart);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCart();
    }
    
    const handleGuestClick = (e) => {
        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        let filterCart = cart.filter(item => item._id === product._id);

        if (filterCart.length === 0) {
            let item = {
                _id: product._id,
                name: product.name,
                price: product.price,
                images: product.images,
                quantity: 1
            }

            cart.push(item);

            localStorage.setItem('cart', JSON.stringify(cart));

            setGuestCart(cart);
        } else {
            alert('Item is already in cart.');
        }
    }

    if (!isUser) {
        return (
            <div>
                <button className="add-btn" onClick={(e) => handleGuestClick(e)}>Add to cart</button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="add-btn" onClick={(e) => handleUserClick(e)}>Add to cart</button>
            </div>
        )
    }
}
