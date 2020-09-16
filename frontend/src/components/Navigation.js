import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({ clickedAdd, setClickedAdd }) {
    useEffect(() => {    
        if (clickedAdd === true) {
            setClickedAdd(false);
        }
    }, [clickedAdd, setClickedAdd])

    return (
        <div>
            <p>Cart: {localStorage.count || 0}</p>
            <Link to="/cart">View cart</Link>
        </div>
    )
}