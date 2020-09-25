import React, { useContext, useState, useEffect } from 'react';
import '../styles/form.css';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';
import { BodyContext } from '../contexts/BodyContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isUser, setIsUser, loading } = useContext(UserContext);
    const { setBodyColor } = useContext(BodyContext);

    useEffect(() => {
        setBodyColor('#fff');
    }, [setBodyColor])

    const handleSubmit = (e) => {
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

        fetchSignIn();
    }

    if (loading) {
        return (
            <Loading/>
        )
    }

    if (!loading && isUser) {
        return (
            <Redirect to="/"/>
        )
    } else if (!loading && !isUser) {
        return (
            <div style={{ width: '30%', margin: 'auto' }}>
                <div className="main-container">
                    <h1 className="main-header">Sign in</h1>
                    <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                        <div className="field-container">
                            <label className="field" htmlFor="email">Email</label>
                            <input className="field" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="field-container">
                            <label className="field" htmlFor="password">Password</label>
                            <input className="field" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="submit-btn" type="submit">Sign in</button>
                    </form>

                    <div className="link-container">Don't have an account? <a className="link" href="/register">Register</a></div>
                    
                    <Route render={ () => { if (isUser) return <Redirect to="/"/> } }/>
                </div>
            </div>
        )
    }
}