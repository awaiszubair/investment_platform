import React, { useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import arr from '../../Testing';
import { useForm } from "react-hook-form";

function SingleAnswerQuestion({ heading, question, variant = 'h1', input, handleInputChange, inputValues, setInputValues }) {
    useEffect(() => {
        // Initialize input values

        console.log("----------------Useeffect function is running-----------------------");
    }, []); // Empty dependency array to run only once on initial render

    return (
        <div style={{ marginTop: '1rem' }}>
            <Typography variant={variant}>{heading}</Typography>
            <p>{question}</p>
            <TextField
                variant='outlined'
                label={input.label}
                name={input.name}
                type={input.type}
                value={inputValues[input.name] || input.ans}
                onChange={(e) => { input.ans = e.target.value; handleInputChange(e) }}
                placeholder={input?.placeholder && input.placeholder}
            />
        </div>
    );
}

export default SingleAnswerQuestion;
