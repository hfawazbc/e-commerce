import React, { useEffect, useState } from 'react';
import '../../styles/app.css';
import Product from '../general_components/Product';

export default function ProductList({ user, setUserCart, guestCart, setGuestCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchProducts = async () => {
            try {
                const response = await fetch('products', {
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
                    return <Product key={product._id} user={user} product={product} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
                })}
            </div>
        </div>
    )
}
