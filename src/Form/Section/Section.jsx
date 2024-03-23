import React from 'react'

function Section({ heading, children, para }) {
    return (
        <div style={{ marginTop: '2rem', marginBottom: '1rem', backgroundColor: '#F0F4F8', padding: '1.5rem', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '2.2rem' }}>{heading && heading}</h1>
            {para && <p>{para}</p>}
            {children}
        </div>
    )
}

export default Section