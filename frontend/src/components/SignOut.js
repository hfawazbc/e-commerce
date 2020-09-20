import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';

export default function SignOut() {
    const [authenticated, setAuthenticated] = useState(true);
    const [foundError, setFoundError] = useState(false);

    const { user, setUser, findingUser } = useContext(UserContext);

    const handleRequest = (e) => {
        e.preventDefault();

        const fetchSignOut = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/sign-out', {
                    method: 'DELETE',
                    credentials: 'include'
                })
    
                const data = await response.json();

                setAuthenticated(data.user.authenticated);

                setUser(data.user.authenticated);
            } catch (error) {
                setFoundError(true);

                console.log(error);
            }
        }

        fetchSignOut();
    }

    let page;

    if (findingUser === false && user === true) {
        page = (
            <div>
                <button onClick={(e) => handleRequest(e)}>Sign out</button>

                <Route render={ () => { if (foundError === true) return <Redirect to="*"/> } }/>
                <Route render={ () => { if ((foundError === false) && (authenticated === false)) return <Redirect to="/sign-in"/> } }/>
            </div>
        )
    }
    
    if (findingUser === false && user === false) {
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
        <div>
            { page }
        </div>
    )
}