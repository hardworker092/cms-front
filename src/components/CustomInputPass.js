import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FormControl } from 'react-bootstrap';
const CustomInputPass = ({
    value,
    onChange,
    showPassword = true,
    onclick,
}) => {

    return (
        <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
                <span>گذرواژه</span>
            </InputLabel>
            <OutlinedInput
                id='outlined-adornment-password'
                fullWidth
                value={value}
                className="font-iran text-sm placeholder:text-gray-300 mb-4"
                onChange={onChange}
                type={showPassword ? 'password' : 'text'}
                InputProps={{
                    style: { font: 'unset' }
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={onclick}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                InputLabelProps={{
                    style: { font: 'unset' },
                    className: "font-iran text-sm"
                }}
            />
        </FormControl>
    )
}

export default CustomInputPass;