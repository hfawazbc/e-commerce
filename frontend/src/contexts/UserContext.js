import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);
    const [findingUser, setFindingUser] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/user', {
                    method: 'GET',
                    credentials: 'include',
                    signal: abortController.signal
                });
                
                if (findingUser === true) {
                    const data = await response.json();

                    setUser(data.user.authenticated);
                }
                
                setFindingUser(false);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.log(error);
                }
            }
        }

        fetchUser();

        return () => {
            abortController.abort();
        }
    }, [findingUser])

    return (
        <UserContext.Provider value={{ user, setUser, findingUser, setFindingUser }}>
            { children }
        </UserContext.Provider>
    )
}