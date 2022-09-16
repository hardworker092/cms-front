import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner } from 'react-bootstrap'
const CustomButton = ({ text, loading, disabled, color, type = 'submit', onClick, height = 35 }) => {
    return (
        <div className='font-iran'>
            <Button onClick={onClick} disabled={disabled} style={{ paddingRight: 20, paddingLeft: 20, backgroundColor: color, borderColor: color, fontSize: 10, height: height }} type={type}>
                {loading ? <Spinner
                    style={{ marginBottom: -3, marginLeft: 20 }}
                    as="span"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="border"
                /> : <div></div>}
                <p className='inline text-xs'>{text}</p>
            </Button>
        </div>
    )
}

export default CustomButton