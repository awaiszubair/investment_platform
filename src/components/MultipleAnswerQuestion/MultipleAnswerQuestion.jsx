import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React, { useEffect } from 'react'

function MultipleAnswerQuestion({ heading, question, input, handleInputChange, inputValues, setInputValues }) {
    useEffect(() => {
        setInputValues(prevState => ({
            ...prevState,
            [input.name]: input.ans
        }));

        console.log('UseEffect Function Ran', inputValues);
    }, [])
    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>{heading && heading}</h3>
            <p>{question && question}</p>
            <RadioGroup
                name={input.name}
                // onChange={(e) => { input.ans = e.target.value }}
                onChange={(e) => { input.ans = e.target.value; handleInputChange(e) }}
                value={inputValues[input.name] || input.ans}


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