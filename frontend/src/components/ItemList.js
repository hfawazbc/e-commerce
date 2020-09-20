import React, { useEffect, useState } from 'react';
import '../styles/itemList.css';
import Item from './Item';
import Loading from './Loading';

export default function ItemList({ userCart, setUserCart, guestCart, setGuestCart }) {
    const [products, setProducts] = useState([]);
    const [findingProducts, setFindingProducts] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products', {
                    method: 'GET',
                    credentials: 'include',
                    signal: abortController.signal
                })

                if (findingProducts) {
                    const data = await response.json();

                    setProducts(data.products);
                }

                setFindingProducts(false);
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
    }, [findingProducts])

    let page;

    if (!findingProducts) {
        page = (
            <div className="item-list-container">
                {products.map((product) => {
                    return <Item key={product._id} product={product} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
                })}
            </div>
        )
    }

    if (findingProducts) {
        page = (
            <Loading/>
        )
    }

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            { page }
        </div>
    )
}
