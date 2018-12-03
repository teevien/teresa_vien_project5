import React from 'react';
import dogface from './dogface.png'

const Error = () => {
    return (
        <div>
            <h2>No Photo!</h2>
            <img src={dogface} alt="dog icon" />
        </div>
    )
}

export default Error;