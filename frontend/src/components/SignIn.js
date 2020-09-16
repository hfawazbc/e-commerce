import React, { useState } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signedIn, setSignedIn] = useState(false);
    const [foundError, setFoundError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fetchLogin = async () => {
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

                setSignedIn(data.signedIn);

                console.log(data);
            } catch (error) {
                setFoundError(true);

                console.log(error);
            }
        }

        fetchLogin();
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Sign in</button>
            </form>

            <div>Don't have an account? Register <Link to="/register">here</Link></div>
            
            <Route render={ () => { if (foundError === true) return <Redirect to="*" /> } }/>
            <Route render={ () => { if ((foundError === false) && (signedIn === true)) return <Redirect to="/" /> } }/>
        </div>
    )
}