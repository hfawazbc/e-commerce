import React, { useEffect, useState } from 'react';
import '../styles/item.css';
import Item from './Item';

export default function ItemList({ isUser, userCart, setUserCart, guestCart, setGuestCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products', {
                    method: 'GET',
                    credentials: 'include',
                    signal: abortController.signal
                })

                const data = await response.json();

                setProducts(data.products);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.log(error);
                }
            }
        }

        fetchProducts();
        
        return () => {
            abortController.abort();
        }
    }, [])

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <div className="item-list-container">
                {products.map((product) => {
                    return <Item key={product._id} product={product} isUser={isUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
                })}
            </div>
        </div>
    )
}
