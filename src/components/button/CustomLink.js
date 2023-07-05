import React from 'react'
import { Link } from 'react-router-dom'

function CustomLink({ text, path, hoverColor = 'hover:text-gray-text' }) {
    return (
        <Link className={`${hoverColor} hover:underline hover:underline-offset-4`} to={path}>{text}</Link>
    )
}

export default CustomLink