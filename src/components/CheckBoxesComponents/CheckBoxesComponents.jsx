import { useState, useEffect } from 'react';
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material';

function CheckBoxesComponent({ heading, question, input, handleInputChange, inputValues, setInputValues }) {
    const [checkedValues, setCheckedValues] = useState(inputValues[input.name] || []);
    useEffect(() => {
        setInputValues(prevState => ({
            ...prevState,
            [input.name]: input.ans
        }));

    }, [])
    useEffect(() => {
        // Update parent component with the checked values
        handleInputChange({ target: { name: input.name, value: checkedValues } });
    }, [checkedValues]);

    const handleChange = (e) => {
        const { value, checked } = e.target;

        // Update the checkedValues state based on whether the checkbox is checked or unchecked
        setCheckedValues(prevValues => {
            if (checked) {
                return [...prevValues, value]; // Add the value if checked
            } else {
                return prevValues.filter(val => val !== value); // Remove the value if unchecked
            }
        });
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>{heading && heading}</h3>
            <p>{question && question}</p>
            <FormGroup
                name={input.name}
                aria-labelledby="demo-checkboxes-group-label"
            >
                {input.options && input.options.map((ds, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox
                            checked={checkedValues.includes(ds)}
                            onChange={handleChange}
                            value={ds}
                        />}
                        label={ds}
                    />
                ))}
            </FormGroup>
        </div>
    );
}

export default CheckBoxesComponent;
