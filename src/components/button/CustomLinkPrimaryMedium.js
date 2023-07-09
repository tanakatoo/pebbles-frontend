import React from 'react'
import { Link } from 'react-router-dom'

function CustomLinkPrimaryMedium({ text, path, }) {
    return (
        <Link className={`hover:underline hover:underline-offset-4 hover:text-primary
        font-medium text-primary-dark`} to={path}>{text}</Link>
    )
}

export default CustomLinkPrimaryMedium