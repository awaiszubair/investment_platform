import React, { useEffect, useState } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, FormControl, Button, Box, Typography } from '@mui/material';
import TextBoxComponent from '../TextBoxComponent/TextBoxComponent';

function RadioButtonComponent({ heading, question, name, register, watch, options, value }) {
    const [state, setState] = useState('');
    const [flag, setFlag] = useState(false);
    const [textflag, setTextflag] = useState(false); // Changed from string to boolean

    const handleChange = (e) => {
        setState(e.target.value);
    }

    useEffect(() => {
        const f = options.find((ds) => ds === "OTHER");
        if (f) {
            if (value) {
                const fnd = options.find((ds) => ds === value);
                if (!fnd) {
                    setTextflag(true);
                    console.log(fnd);
                }
            }
        }
        console.log("Value From RadioButton is: ", value)
        console.log("The State is: ", state);
        const checking = options.find((df) => df === value);
        console.log("The checking is: ", checking);

    }, []); // Added dependencies for useEffect

    return (
        <div style={{ marginTop: '2.5rem' }}>
            <h1>{heading && heading}</h1>
            <p>{question && question}</p>
            <FormControl>
                {textflag ?
                    <>
                        <TextBoxComponent
                            name={name}
                            onChange={(e) => { setTextValue(e.target.value) }}
                            register={register}
                            value={value}
                        />
                        <Box sx={{ mt: '2rem', display: 'flex' }}>
                            <Typography sx={{ marginRight: '1rem' }}>
                                <Button variant='contained' sx={{ bgcolor: 'red' }}>Reject</Button>
                            </Typography>
                            <Typography>
                                <Button variant='contained' >Accept</Button>
                            </Typography>
                        </Box>
                    </>
                    :
                    (
                        <>
                            <RadioGroup
                                sx={{ marginTop: '1rem' }}
                                name={name}
                                value={(watch && watch(name)) || value}
                                onChange={(e) => { handleChange(e) }}
                            >
                                {options && options.map((ds, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={ds}
                                        label={ds}
                                        control={<Radio />}
                                        {...register(`${name}`)}
                                    />
                                ))}
                            </RadioGroup>
                            <Box sx={{ mt: '2rem', display: 'flex' }}>
                                <Typography sx={{ marginRight: '1rem' }}>
                                    <Button variant='contained' sx={{ bgcolor: 'red' }}>Reject</Button>
                                </Typography>
                                <Typography>
                                    <Button variant='contained' >Accept</Button>
                                </Typography>
                            </Box>
                        </>
                        // {state === 'OTHER' &&
                        //     <TextBoxComponent
                        //         name={name}
                        //         onChange={(e) => { setTextValue(e.target.value) }}
                        //         register={register}
                        //     />
                        // }
                    )
                }
                {/* {flag &&
                    <Box sx={{ mt: '2rem', display: 'flex' }}>
                        <Typography sx={{ marginRight: '1rem' }}>
                            <Button variant='contained'>Reject</Button>
                        </Typography>
                        <Typography>
                            <Button variant='contained'>Accept</Button>
                        </Typography>
                    </Box>
                } */}
            </FormControl>
            {console.log("The value is: ", value)}
            {console.log(watch && watch(name))}
            {console.log(watch && watch("The name is: ", name))}
        </div>
    );
}

export default RadioButtonComponent;
