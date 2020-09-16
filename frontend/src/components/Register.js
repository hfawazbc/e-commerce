import React, { useState } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registered, setRegistered] = useState(false);
    const [foundError, setFoundError] = useState(false);

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
                
                setRegistered(data.registered);

                console.log(data);
            } catch (error) {
                setFoundError(true);

                console.log(error);
            }
        }
        
        fetchRegister();
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Register</button>
            </form>

            <div>Already have an account? Sign in <Link to="/sign-in">here</Link></div>

            <Route render={ () => { if (foundError === true) return <Redirect to="*" /> } }/>
            <Route render={ () => { if ((foundError === false) && (registered === true)) return <Redirect to="/sign-in" /> } }/>
        </div>
    )
}
