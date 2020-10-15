import React from 'react'

export default function PageLoading() {
    return (
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h1>Loading...</h1>
        </div>
    )
}
