import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';

export default function SignOut() {
    const [authenticated, setAuthenticated] = useState(true);
    const [foundError, setFoundError] = useState(false);

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

                setAuthenticated(data.user.authenticated);

                setIsUser(data.user.authenticated);
            } catch (error) {
                setFoundError(true);

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
    }

    if (!loading && isUser) {
        return (
            <div>
                <button onClick={(e) => handleClick(e)}>Sign out</button>

                <Route render={ () => { if (foundError === true) return <Redirect to="*"/> } }/>
                <Route render={ () => { if ((foundError === false) && (authenticated === false)) return <Redirect to="/sign-in"/> } }/>
            </div>
        )
    }
}