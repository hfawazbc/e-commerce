import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        if (loading) {
            const fetchUser = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users/admin', {
                        method: 'GET',
                        credentials: 'include',
                        signal: abortController.signal
                    });

                    const data = await response.json();
    
                    setIsAdmin(data.isAdmin);
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
        <AdminContext.Provider value={{ isAdmin, setIsAdmin, loading, setLoading }}>
            { children }
        </AdminContext.Provider>
    )
}