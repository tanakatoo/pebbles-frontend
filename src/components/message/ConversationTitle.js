import React from 'react'
import Avatar from '../common/Avatar'
import CustomLink from '../button/CustomLink'
import { AwesomeChevronLeft } from '../../styles/Icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function ConversationTitle({ src, link, username }) {
    const navigate = useNavigate()
    return (
        <div className='w-full border-y flex border-gray-stroke'>
            <div className='flex items-center ps-8 hover:text-gray-text cursor-pointer' >
                <Link to="/messages"><AwesomeChevronLeft /></Link>
                <Link to="/messages"><p className='ms-2'>Back</p></Link>
            </div>
            <div className='grow py-4 flex justify-center items-center gap-2 w-full pe-10'>
                <Avatar src={src} link={link} username={username} /> <CustomLink text={username} path={link} />
            </div>
        </div>
    )
}

export default ConversationTitle