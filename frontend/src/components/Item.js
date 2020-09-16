import React from 'react';
import CartAddItem from './CartAddItem';

export default function Item({ product, setClickedAdd }) {

    return (
        <div>
            <div>
                <p>{product.title}</p>
                <p>{product.category}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <CartAddItem product={product} setClickedAdd={setClickedAdd} />
            </div>
        </div>
    )
}
