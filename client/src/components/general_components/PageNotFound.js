import React from 'react';
import '../../styles/app.css';

export default function PageNotFound() {
    return (
        <div className="component-position">
            <h2 style={{ textAlign: 'center' }}>404 Not Found</h2>
            <div className="link-container">
                <a href="/" className="link">Return home</a>
            </div>
        </div>
    )
}
