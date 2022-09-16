import * as React from 'react';
import TextField from '@mui/material/TextField';
const CustomInput = ({ value, onChange, placeholder, multiline = false, required = false, defaultValue = '' }) => {

    return (
        <TextField
            required={required}
            fullWidth
            defaultValue={defaultValue}
            label={placeholder}
            value={value}
            className="font-iran text-sm placeholder:text-gray-300 mb-4"
            onChange={onChange}
            multiline={multiline}
            rows={5}
            maxRows={10}
            InputProps={{
                style: { font: 'unset' }
            }}
            InputLabelProps={{
                style: { font: 'unset' },
                className: "font-iran text-sm"
            }}
        />
    )
}

export default CustomInput;