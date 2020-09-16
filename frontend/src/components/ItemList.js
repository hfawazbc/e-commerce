import React, { useEffect, useState } from 'react';
import Item from './Item';

export default function ItemList({ setClickedAdd }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/product-list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })

                const data = await response.json();

                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts();
    }, [])

    return (
        <div>
            {products.map((product) => {
                return <Item key={product._id} product={product} setClickedAdd={setClickedAdd}/>
            })}
        </div>
    )
}
