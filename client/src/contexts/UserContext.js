import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        if (loading) {
            const fetchUser = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users/user', {
                        method: 'GET',
                        credentials: 'include',
                        signal: abortController.signal
                    });

                    const data = await response.json();
    
                    setIsUser(data.isAuth);
                    setLoading(false);
                } catch (error) {
                    if (!abortController.signal.aborted) {
                        console.log(error);
                    }
                }
            }
    
            fetchUser();
        }

        return () => {
            abortController.abort();
        }
    }, [loading])

    return (
        <UserContext.Provider value={{ isUser, setIsUser, loading, setLoading }}>
            { children }
        </UserContext.Provider>
    )
}