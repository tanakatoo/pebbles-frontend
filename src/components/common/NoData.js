import React from 'react'
import { Link } from 'react-router-dom'

function NoData({ msg, link, linkText }) {
    return (
        <div className='text-center'>
            <span>
                {msg}
            </span>
            <p className='text-link'><Link to={link}>{linkText}</Link></p>
        </div>
    )
}

export default NoData