import React from 'react'
import CustomLink from '../button/CustomLink';

function Avatar({ link = null, src, size = 'sm' }) {
    console.log(link)
    let width
    switch (size) {
        case 'sm':
            width = 'w-50'
            break;
        case 'profile':
            width = 'w-112'
        case 'user':
            width = 'w-80'
        default:
            break;
    }

    let height
    switch (size) {
        case 'sm':
            height = 'h-50'
            break;
        case 'profile':
            height = 'h-112'
        case 'user':
            height = 'h-80'
        default:
            break;
    }

    return (

        <div className={`bg-white shrink-0 pt-1 ${width} ${height} rounded-full border text-gray-stroke`}>
            {link ?
                <CustomLink path={link} text={<img className='rounded-full h-full mx-auto'
                    src={`../../avatars/${src}`} />} />
                :
                <img className='  rounded-full h-full mx-auto'
                    src={`../../avatars/${src}`} />
            }
        </div>

    )
}

export default Avatar