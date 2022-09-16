import React from 'react';

const NotFound = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <img src="notfound.jpg" width={'70%'} height={'70%'} alt="notFound" />
            <h6 className="font-iran text-2xl font-bold">صفحه مورد نظر یافت نشد</h6>
        </div>
    )
}

export default NotFound;