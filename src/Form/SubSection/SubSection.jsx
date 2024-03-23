import React, { useEffect } from 'react'

function SubSection({ heading, para, children }) {
    return (
        <div style={{ marginTop: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem' }}>{heading && heading}</h1>
            <p>{para && para}</p>
            {children}
        </div>
    )
}

export default SubSection