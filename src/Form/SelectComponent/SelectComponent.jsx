import React from 'react'
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material'

function SelectComponent({ name, label, options, register }) {
    const [state, setState] = React.useState('');

    const handleChange = (event) => {
        setState(event.target.value);
    };
    return (
        <div style={{ marginTop: '2rem' }}>
            <FormControl style={{ width: '250px' }}>
                <InputLabel id="demo-simple-select-label">{label && label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={label && label}
                    {...register(name)} // Register the Select component
                >
                    {options.map((ds) => (
                        <MenuItem key={ds} value={ds}>
                            {ds}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectComponent