import React from 'react'

function BulletPointsComponent({ heading, points }) {
    return (
        <>
            {heading && <h1 style={{ marginBottom: '2rem' }}>{heading}</h1>}
            <ul style={{ listStyle: 'circle' }}>
                {points && points.map((point, index) => (
                    <li key={index} style={{ margin: '2rem' }}>{point}</li>
                ))}
            </ul>
        </>
    )
}

export default BulletPointsComponent