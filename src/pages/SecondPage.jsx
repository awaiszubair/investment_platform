import React from 'react'

function SecondPage() {
    return (
        <>
            <h1 style={{ fontSize: '2rem', marginTop: '2rem' }}>Basic Info</h1>
            <p style={{ marginTop: '1rem' }}>How would you react in case of sudden loss in Stocks</p>
            <TextField variant='outlined' label='Your answer'
                sx={{ marginTop: '1rem' }}
                value="If there is an sudden loss in assets then it has"
            />
            <p style={{ marginTop: '1rem' }}>How would you react in case of sudden loss in Stocks</p>
            <TextField variant='outlined' label='Your answer'
                sx={{ marginTop: '1rem' }}
                value="Assets are the own property that brings us the profit in any shape"
            />
        </>
    )
}

export default SecondPage