import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { instance } from '../../services/configServer';

const AddFile = () => {

    const [loading, setLoading] = useState(false);
    const hiddenFileInupt = useRef(null);

    const handleClick = (e) => {
        setLoading(true);
        console.log(e.target.files[0].type);
        const formData = new FormData();
        formData.append('title', e.target.files[0].name.split('.')[0].trim());
        formData.append('size', e.target.files[0].size);
        formData.append('picture', e.target.files[0]);
        formData.append('type', e.target.files[0].type);
        instance.post('libraries/add', formData).then((response) => {
            console.log(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        <div className='w-full h-full p-10'>
            <input
                hidden
                ref={hiddenFileInupt}
                type='file'
                onChange={handleClick}
            />
            <div onClick={() => hiddenFileInupt.current.click()} className='w-full h-72 border-2 border-gray-400 border-dashed rounded-md flex justify-center items-center cursor-pointer'>
                {loading ? <Spinner
                    style={{ color: 'blue' }}
                    as="span"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                    animation="border"
                /> : <span className='text-base'>افزودن</span>}
            </div>
        </div>
    )
}

export default AddFile