import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import Error from './Error';
import Loading from './Loading';

export default function SessionRoute({ component: Component, ...rest }) {
    const [findingUser, setFindingUser] = useState(true);
    const [foundUser, setFoundUser] = useState(false);
    const [foundError, setFoundError] = useState(false);

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

                    setFoundUser(data.user);

                    console.log(data);
                }

                setFindingUser(false);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    setFoundError(true);
                    console.log(error);
                }
            }
        }

        fetchUser();

        return () => {
            abortController.abort();
        }
    })

    return (
        <div>
            <Route { ...rest } render={ () => { if (foundError === true) return <Error /> } }/>
            <Route { ...rest } render={ () => { if (findingUser === true) return <Loading /> } }/>
            <Route { ...rest } render={ () => { if ((foundError === false) && (findingUser === false) && (foundUser === true)) return <Redirect to="/"/> } }/>
            <Route { ...rest } render={ () => { if ((foundError === false) && (findingUser === false) && (foundUser === false)) return <Component /> } }/>
        </div>
    )
}