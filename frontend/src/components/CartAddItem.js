import React, { useContext } from 'react';
import '../styles/cartAddItem.css';
import { UserContext } from '../contexts/UserContext';

export default function CartAddItem({ product, userCart, setUserCart, guestCart, setGuestCart }) {
    const { user, findingUser } = useContext(UserContext);

    let page;

    if (findingUser === false && user === true) {
        const handleClick = (e) => {
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

                    setUserCart(data.user.cart);
                } catch (error) {
                    console.log(error);
                }
            }

            fetchCart();
        }

        page = (
            <div>
                <button className="add-btn" onClick={(e) => handleClick(e)}>Add to cart</button>
            </div>
        )
    }

    if (findingUser === false && user === false) {
        const handleClick = (e) => {
            e.preventDefault();
    
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            let checkCart = cart.filter(item => item._id === product._id);
    
            if (checkCart.length === 0) {
                let item = {
                    _id: product._id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    quantity: 1
                }
    
                cart.push(item);
    
                localStorage.setItem('cart', JSON.stringify(cart));

                setGuestCart(cart);
            }
        }

        page = (
            <div>
                <button className="add-btn" onClick={(e) => handleClick(e)}>Add to cart</button>
            </div>
        )
    }

    return (
        <div>
            { page }
        </div>
    )
}
