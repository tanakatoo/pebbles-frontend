import React from 'react'


const Spinner = () => {
    return (
        <div className='w-full flex justify-center'>
            <div
                className="inline-block h-8 w-8 rounded-full animate-spin border-r-4 border-t-4 border-l-4  align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>

        </div>
    )
}

export default Spinner