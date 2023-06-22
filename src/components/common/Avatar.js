import React from 'react'
import { Link } from 'react-router-dom'

function Avatar({ link = null, src, size = 'sm' }) {

    const width = size === 'profile' ? 'w-112' : 'w-50'
    const height = size === 'profile' ? 'h-112' : 'h-50'
    return (

        <div className={`shrink-0 pt-1 ${width} ${height} rounded-full border text-gray-stroke`}>
            {link ?
                <Link to={link}>
                    <img className=' rounded-full h-full mx-auto'
                        src={src} />
                </Link >
                :
                <img className='rounded-full h-full mx-auto'
                    src={src} />
            }
        </div>

    )
}

export default Avatar