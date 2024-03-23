import { useState, useEffect } from 'react';
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material';

function CheckBoxComponent({ heading, question, name, options }) {
    return (
        <div style={{ marginTop: '2rem' }}>
            <h3>{heading && heading}</h3>
            <p>{question && question}</p>
            <FormGroup
                name={name}
                sx={{ marginTop: '1rem' }}
                aria-labelledby="demo-checkboxes-group-label"
            >
                {options && options.map((ds, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox
                            // onChange={handleChange}
                            value={ds}
                        />}
                        label={ds}
                    />
                ))}
            </FormGroup>
        </div>
    );
}

export default CheckBoxComponent;
