import React, { useState } from 'react';
import '../styles/app.css';
import { Redirect, Route } from 'react-router-dom';

export default function SignIn({ isUser, setIsUser, setUserCart, guestCart, setGuestCart }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fetchSignIn = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/sign-in', {
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

                if (!data.isSignedIn) {
                    alert(data.message);
                }
                
                setIsUser(data.isSignedIn);
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

    if (isUser) {
        return (
            <Redirect to="/"/>
        )
    } else {
        return (
            <div>
                <div className="form-container">
                    <h1 className="form-caption">Sign in</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-field-container">
                            <label className="form-field" htmlFor="email">Email</label>
                            <input className="form-field" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-field-container">
                            <label className="form-field" htmlFor="password">Password</label>
                            <input className="form-field" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="form-submit-btn" type="submit">Sign in</button>
                    </form>

                    <div className="link-container">Don't have an account? <a className="link" href="/register">Register</a></div>
                    
                    <Route render={ () => { if (isUser) return <Redirect to="/"/> } }/>
                </div>
            </div>
        )
    }
}