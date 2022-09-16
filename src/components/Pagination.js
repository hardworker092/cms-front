import React, { useState } from "react";

const Pagination = ({ prePage, totalList, paginate }) => {
    const [indexPage, setIndexPage] = useState(1);

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalList / prePage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className="flex flex-row items-center mt-2 bg-white shadow-md py-3 justify-center">
            {pageNumber.map((number, index) => {
                return (
                    <button
                        key={number} type="button"
                        onClick={() => { paginate(number); setIndexPage(number) }}
                        className={`font-yRegular ${indexPage == number ? 'bg-blue-200' : 'bg-gray-200'} w-8 h-8  ml-2 flex justify-center items-center rounded-full hover:bg-gray-300`}>
                        <span key={index}>{number}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default Pagination;