import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { suffix, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        // name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            suffix={' تومان '}
        // prefix="$"
        />
    );
});

NumberFormatCustom.propTypes = {
    // name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const InputNumber = ({ value, required = false, label, onChange }) => {

    return (
        <Box
            sx={{
                '& > :not(style)': {
                    m: 1,
                },
            }}
        >
            <TextField
                required={required}
                fullWidth
                label={label}
                value={value}
                name={value}
                onChange={onChange}
                className="font-iran text-sm placeholder:text-gray-300 mb-4"
                InputProps={{
                    style: { font: 'unset' },
                    inputComponent: NumberFormatCustom,
                }}
                InputLabelProps={{
                    style: { font: 'unset' },
                    className: "font-iran text-xl"
                }}
            />
        </Box>
    );
}

export default InputNumber;