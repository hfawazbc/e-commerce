import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';

export default function SignOut() {
    const { isUser, setIsUser, loading } = useContext(UserContext);

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

    if (loading) {
        return (
            <Loading/>
        )
    }

    if (!loading && !isUser) {
        return (
            <Redirect to="/"/>
        )
    } else if (!loading && isUser) {
        return (
            <div className="sign-out-container">
                <button className="sign-out-btn" onClick={(e) => handleClick(e)}>Sign out</button>

                <Route render={ () => { if (!isUser) return <Redirect to="/"/> } }/>
            </div>
        )
    }
}