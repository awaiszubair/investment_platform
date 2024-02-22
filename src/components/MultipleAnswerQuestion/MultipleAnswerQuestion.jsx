import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

function MultipleAnswerQuestion({ heading, question, input, handleInputChange, inputValues }) {
    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>{heading && heading}</h3>
            <p>{question && question}</p>
            <RadioGroup
                name={input.name}
                // onChange={(e) => { input.ans = e.target.value }}
                onChange={(e) => { input.ans = e.target.value; handleInputChange(e) }}
                value={inputValues[input.name] || ''}
                aria-labelledby="demo-radio-buttons-group-label"
            // sx={
            //     { ...style }
            // }

            >
                {input.options && input.options.map((ds) => (
                    <>
                        <FormControlLabel
                            // {...register(`${dt.input.name}`, { require: true })}
                            value={`${ds}`} control={<Radio />} label={`${ds}`} />
                    </>
                ))}
            </RadioGroup>
        </div>
    )
}

export default MultipleAnswerQuestion