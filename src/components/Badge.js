import React from 'react';
const Badge = ({ postion }) => {
    return (
        <span className={`flex w-[.60rem] h-[.60rem] rounded-full bg-green-600 absolute ${postion} border border-white`}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
        </span>
    );
}
export default Badge;
