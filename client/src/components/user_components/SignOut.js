import React from 'react';
import '../../styles/app.css';

export default function SignOut({ setUser }) {
    const handleClick = (e) => {
        e.preventDefault();

        const fetchSignOut = async () => {
            try {
                const response = await fetch('users/sign-out', {
                    method: 'DELETE',
                    credentials: 'include'
                })
    
                const data = await response.json();

                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSignOut();
    }

    return (
        <div>
            <button className="sign-out-btn" onClick={(e) => handleClick(e)}>Sign out</button>
        </div>
    )
}