import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function SignOut({ isUser, setIsUser }) {
    const handleClick = (e) => {
        e.preventDefault();

        const fetchSignOut = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/sign-out', {
                    method: 'DELETE',
                    credentials: 'include'
                })
    
                const data = await response.json();

                setIsUser(data.isAuth);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSignOut();
    }

    if (!isUser) {
        return (
            <Redirect to="/"/>
        )
    } else {
        return (
            <div className="sign-out-container">
                <button className="sign-out-btn" onClick={(e) => handleClick(e)}>Sign out</button>

                <Route render={ () => { if (!isUser) return <Redirect to="/"/> } }/>
            </div>
        )
    }
}