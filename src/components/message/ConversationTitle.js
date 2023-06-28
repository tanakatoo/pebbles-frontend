import React from 'react'
import Avatar from '../common/Avatar'
import CustomLink from '../button/CustomLink'

function ConversationTitle({ src, link, username }) {
    return (
        <div className='py-4 flex justify-center items-center gap-2 border-y border-gray-stroke w-full'>
            <Avatar src={src} link={link} /> <CustomLink text={username} path={link} />
        </div>
    )
}

export default ConversationTitle