import React from 'react';
import '../../styles/app.css';

export default function CartAddProductUser({ product, setUserCart }) {
    const handleClick = (e) => {
        e.preventDefault();

        const fetchCart = async () => {
            try {
                const response = await fetch('users/user/cart/add-item', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: product._id
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

    return (
        <div>
            <button className="add-to-cart-btn" onClick={(e) => handleClick(e)}>Add to cart</button>
        </div>
    )
}
