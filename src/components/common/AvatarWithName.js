import React from 'react'
import "./Avatar"
import Avatar from './Avatar'

function AvatarWithName({ src, username, link = null }) {
    return (
        <div className='w-max flex items-center'>
            <Avatar src={src} />
            <span className='grow ps-4'>{username}</span>
        </div>
    )
}

export default AvatarWithName