import { TextField } from "@mui/material";
import React from 'react';

const HomeScreen = () => {
    return (
        <div className="text-center font-bold pt-4">
            <TextField label="شماره همراه" className="font-iran font-xs placeholder:text-gray-300"
                InputProps={{
                    style: { font: 'unset', fontSize: '.8rem', fontWeight: 'lighter' }
                }}
                InputLabelProps={{
                    title: 'hello',
                    style: { fontSize: '1rem', font: 'unset', fontWeight: 'normal' }
                }}
            />
        </div>
    )
}

export default HomeScreen;