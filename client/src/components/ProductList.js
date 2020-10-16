import React, { useEffect, useState } from 'react';
import '../styles/app.css';
import Product from './Product';

export default function ProductList({ isUser, userCart, setUserCart, guestCart, setGuestCart }) {
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
        <div>
            <div className="product-list-container">
                {products.map((product) => {
                    return <Product key={product._id} product={product} isUser={isUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
                })}
            </div>
        </div>
    )
}
