import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function SignOut() {
    const [signedOut, setSignedOut] = useState(false);
    const [foundError, setFoundError] = useState(false);

    const handleRequest = (e) => {
        e.preventDefault();

        const fetchLogin = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/sign-out', {
                    method: 'DELETE',
                    credentials: 'include'
                })
    
                const data = await response.json();

                setSignedOut(data.signedOut);

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
            <button onClick={(e) => handleRequest(e)}>Sign out</button>
            
            <Route render={ () => { if (foundError === true) return <Redirect to="*" /> } }/>
            <Route render={ () => { if ((foundError === false) && (signedOut === true)) return <Redirect to="/sign-in" /> } }/>
        </div>
    )
}