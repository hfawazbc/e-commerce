import React, { useContext, useState, useEffect } from 'react';
import '../styles/form.css';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { BodyContext } from '../contexts/BodyContext';
import Loading from './Loading';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [foundError, setFoundError] = useState(false);

    const { user, findingUser } = useContext(UserContext);
    const { setBodyColor } = useContext(BodyContext);

    useEffect(() => {
        setBodyColor('#fff');
    }, [setBodyColor])

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
                
                setRegistered(data.user.registered);
            } catch (error) {
                setFoundError(true);

                console.log(error);
            }
        }
        
        fetchRegister();
    }

    let page;

    if (findingUser === false && user === false) {
        page = (
            <div className="main-container">
                <h1 className="main-header">Register</h1>
                <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                    <div className="field-container">
                        <label className="field" htmlFor="email">Email</label>
                        <input className="field" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="field-container">
                        <label className="field" htmlFor="password">Password</label>
                        <input className="field" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="submit-btn" type="submit">Register</button>
                </form>

                <div className="link-container">Already have an account? <a className="link" href="/sign-in">Sign in</a></div>

                <Route render={ () => { if (foundError === true) return <Redirect to="*"/> } }/>
                <Route render={ () => { if ((foundError === false) && (registered === true)) return <Redirect to="/sign-in"/> } }/>
            </div>
        )
    } 

    if (findingUser === false && user === true) {
        page = (
            <Redirect to="/"/>
        )
    }

    if (findingUser === true && user === false) {
        page = (
            <Loading/>
        )
    }

    return (
        <div style={{ width: '30%', margin: 'auto' }}>
            { page }
        </div>
    )
}
