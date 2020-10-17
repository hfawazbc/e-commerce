import React from 'react';
import '../../styles/app.css';
import CartAddProductGuest from '../guest_components/CartAddProductGuest';
import CartAddProductUser from '../user_components/CartAddProductUser';

export default function Product({ product, user, setUserCart, guestCart, setGuestCart }) {
    const image = `http://localhost:5000/files/${product.images[0].filename}`;

    const renderCartAddProduct = () => {
      if (!user.isAuth) {
        return (
          <CartAddProductGuest product={product} guestCart={guestCart} setGuestCart={setGuestCart}/>
        )
      } else {
        return (
          <CartAddProductUser product={product} setUserCart={setUserCart}/>
        )
      }
    }

    return (
        <div>
            <div className="product-container">    
                <h2 style={{ marginBottom: '15px' }}>{product.name}</h2>
                <img className="product-image" style={{ marginBottom: '15px' }} src={image} alt={product.name}/>
                <p style={{ marginBottom: '15px' }}>${product.price}</p>
                {renderCartAddProduct()}
            </div>
        </div>
    )
}
