import React from 'react';

export default function PageNotFound() {
    return (
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h1>404 Not Found</h1>
            <div style={{ textAlign: 'center' }}>
                <a href="/" style={{ textDecoration: 'none', color: '#03A9F4' }}>Return home</a>
            </div>
        </div>
    )
}
