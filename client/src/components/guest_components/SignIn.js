import React, { useState } from 'react';
import '../../styles/app.css';

export default function SignIn({ setUser, setUserCart, guestCart, setGuestCart }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fetchSignIn = async () => {
            try {
                const response = await fetch('/users/sign-in', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    credentials: 'include'
                })
    
                const data = await response.json();

                if (!data.isAuth) {
                    alert(data.message);
                }
                
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }

        await fetchSignIn();

        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/user/merge-cart', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ guestCart }),
                    credentials: 'include'
                })
                
                const data = await response.json();

                setUserCart(data.cart);
            } catch (error) {
                console.log(error);
            }
        }

        await fetchCart();

        localStorage.clear();
    
        setGuestCart([]);
    }

    return (
        <div className="component-size">
            <div className="component-padding">
                <div className="form-container">
                    <h2 className="form-caption">Sign in</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="email">Email</label>
                        <input className="form-field" id="email" type="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input className="form-field" id="password" type="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
                        <button className="form-submit-btn" type="submit">Sign in</button>
                    </form>
                    <div className="link-container">Don't have an account? <a className="link" href="/register">Register</a></div>
                </div>
            </div>
        </div>
    )
}