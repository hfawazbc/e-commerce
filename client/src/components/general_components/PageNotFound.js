import React from 'react';
import '../../styles/app.css';

export default function PageNotFound() {
    return (
        <div className="component-position">
            <h1 style={{ textAlign: 'center' }}>404 Not Found</h1>
            <div className="link-container">
                <a href="/" className="link">Return home</a>
            </div>
        </div>
    )
}
