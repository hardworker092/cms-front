import React from 'react';

const BackgroundAuth = ({ children }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600  to-blue-400 h-screen w-full flex justify-center items-center px-52 py-32 fixed">
            <div className='bg-gray-100 rounded-lg shadow-sm w-full h-full grid xl:grid-cols-2'>
                {children}
            </div>
        </div>
    )
}

export default BackgroundAuth