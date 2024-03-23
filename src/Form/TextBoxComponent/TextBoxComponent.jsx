import React, { useEffect, useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { useForm } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';

function TextBoxComponent({ heading, question, type = 'text', variant = 'h3', register, name, placeholder, label, inputProps = false, value }) {
    const [state, setState] = useState('');
    useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <div style={{ marginTop: '2rem' }}>
            <h1 >{heading && heading}</h1>
            <p style={{ marginBottom: '2rem' }}>{question}</p>
            {name && <TextField
                label={label}
                autoComplete='off'
                placeholder={placeholder}
                variant='outlined'
                // name={name}
                type={type}
                value={value} // Use the value prop here
                onChange={(e) => setState(e.target.value)}
                InputProps={{
                    startAdornment: inputProps && <InputAdornment position="start">$</InputAdornment>
                }}
                {...register(name)}

            />}

        </div>
    );
}

export default TextBoxComponent;
