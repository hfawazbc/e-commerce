import React from 'react';
import '../../styles/app.css';
import CartRemoveProductGuest from '../guest_components/CartRemoveProductGuest';
import CartRemoveProductUser from '../user_components/CartRemoveProductUser';

export default function CartProduct({ user, product, setUserCart, guestCart, setGuestCart}) {
    const image = `/files/${product.images[0].filename}`;
    
    const renderCartRemoveProduct = () => {
        if (!user.isAuth) {
            return (
                <CartRemoveProductGuest product={product} guestCart={guestCart} setGuestCart={setGuestCart}/>
            )
        } else {
            return (
                <CartRemoveProductUser product={product} setUserCart={setUserCart}/>
            )
        }
    }

    return (
        <div>
            <div className="product-container">
                <h3 style={{ marginBottom: '15px' }}>{product.name}</h3>
                <img className="product-image" style={{ marginBottom: '15px' }} src={image} alt={product.name}/>
                <p style={{ marginBottom: '15px' }}>${product.price}</p>
                {renderCartRemoveProduct()}
            </div>
        </div>
    )
}