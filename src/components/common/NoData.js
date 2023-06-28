import React from 'react'
// import { Link } from 'react-router-dom'
import CustomLink from '../button/CustomLink'

function NoData({ msg, link, linkText }) {
    return (
        <div className='text-center'>
            <span>
                {msg}
            </span>
            <p className='text-link'><CustomLink path={link} text={linkText} /></p>
        </div>
    )
}

export default NoData