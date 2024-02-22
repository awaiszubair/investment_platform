import React, { useState } from 'react'
import { TextField, Typography } from '@mui/material'

import { useForm } from "react-hook-form"
function SingleAnswerQuestion({ heading, question, variant = 'h1', state, input, handleInputChange, inputValues }) {
    return (
        <div style={{ marginTop: '1rem' }}>
            <Typography variant={variant && variant}>{heading && heading}</Typography>
            {/* <h3>{heading && heading}</h3> */}
            <p>{question && question}</p>
            <TextField
                variant='outlined'
                label={input.label}
                name={input.name}
                type={input.type}
                value={inputValues[input.name] || ''}
                // onChange={(e) => { input.ans = e.target.value }}
                onChange={(e) => { input.ans = e.target.value; handleInputChange(e) }}
                placeholder={input?.placeholder && input.placeholder}
            />
            <span>{state}</span>
            {console.log("The State are: ", state)}
        </div>
    )
}

export default SingleAnswerQuestion