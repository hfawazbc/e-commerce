import React, { useState } from 'react';
import '../../styles/app.css';
import { Redirect, Route } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const fetchRegister = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })

                const data = await response.json();

                if (!data.isRegistered) {
                    alert(data.message);
                }
                
                setRegistered(data.isRegistered);
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchRegister();
    }

    return (
        <div className="component-size">
            <div className="component-padding">
                <div className="form-container">
                    <h2 className="form-caption">Register</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="email">Email</label>
                        <input className="form-field" id="email" type="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input className="form-field" id="password" type="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
                        <button className="form-submit-btn" type="submit">Register</button>
                    </form>
                    <div className="link-container">Already have an account? <a className="link" href="/sign-in">Sign in</a></div>
                    <Route render={ () => { if (registered === true) return <Redirect to="/sign-in"/> } }/>
                </div>
            </div>
        </div>
    )
}
