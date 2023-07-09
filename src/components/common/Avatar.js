import React from 'react'
import { useNavigate } from 'react-router-dom';
import useNavigateToProfile from '../../hooks/useNavigateToProfile';


function Avatar({ link = null, src, size = 'sm', username, noDropdownShadow = false }) {
    const goToProfile = useNavigateToProfile(username)

    let width
    switch (size) {
        case 'sm':
            width = 'w-50'
            break;
        case 'profile':
            width = 'w-112'
        case 'user':
            width = 'w-80'
        case 'navbar':
            width = 'w-45'
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
        case 'navbar':
            width = 'h-45'

        default:
            break;
    }

    return (

        <div className={`bg-white shrink-0 pt-1 ${width} ${height} rounded-full border text-gray-stroke ${noDropdownShadow ? '' : 'hover:shadow-dropdown'}`}>
            {link ?
                <img className='rounded-full h-full mx-auto cursor-pointer' onClick={() => goToProfile(username)}
                    src={`../../avatars/${src}`} />
                :
                <img className='  rounded-full h-full mx-auto'
                    src={`../../avatars/${src}`} />
            }
        </div>

    )
}

export default Avatar