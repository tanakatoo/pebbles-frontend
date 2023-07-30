import React from 'react'
// import { Link } from 'react-router-dom'
import CustomLink from '../button/CustomLink'
import CustomLinkPrimaryMedium from '../button/CustomLinkPrimaryMedium'

function NoData({ msg, link, linkText }) {
    return (
        <div className='text-center py-12'>
            <span>
                {msg}
            </span>
            <p ><CustomLinkPrimaryMedium path={link} text={linkText} /></p>
        </div>
    )
}

export default NoData