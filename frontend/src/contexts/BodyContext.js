import React, { createContext, useState } from 'react';

export const BodyContext = createContext();

export default function BodyContextProvider({ children }) {
    const backgroundColor = '#eeeeee';
    let [bodyColor, setBodyColor] = useState(backgroundColor);

    document.body.style.backgroundColor = bodyColor;

    return (
        <BodyContext.Provider value={{ bodyColor, setBodyColor }}>
            { children }
        </BodyContext.Provider>
    )
}