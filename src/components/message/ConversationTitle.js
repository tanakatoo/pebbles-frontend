import React from 'react'
import Avatar from '../common/Avatar'

function ConversationTitle({ src, link, username }) {
    return (
        <div className='py-4 flex justify-center items-center gap-2 border-y border-gray-stroke w-full'>
            <Avatar src={src} /> {username}
        </div>
    )
}

export default ConversationTitle