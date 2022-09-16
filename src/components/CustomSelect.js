import * as React from 'react';
import TextField from '@mui/material/TextField';
const CustomSelect = ({ value, onChange, label, children, name, selected = false }) => {

    return (
        <TextField
            select
            fullWidth
            label={label}
            value={value}
            name={name}
            onChange={onChange}
            className="font-iran text-sm placeholder:text-gray-300 mb-4"
            SelectProps={{
                native: selected
            }}
            InputProps={{
                style: { font: 'unset' }
            }}
            InputLabelProps={{
                style: { font: 'unset' },
                className: "font-iran text-sm"
            }}
        >
            {children}
        </TextField>
    )
}

export default CustomSelect;