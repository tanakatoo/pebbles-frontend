import React, { useEffect } from 'react'

function Pricing() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='py-24 flex flex-col items-center'>
            <h1 className='text-center font-bold text-mobile-header-1 mb-12'>Future home of PRicing</h1>
            <p className='mb-12 text-center'>Please check back at a later date. Busy constructing...</p>
        </div>
    )
}

export default Pricing