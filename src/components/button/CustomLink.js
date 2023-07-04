import React from 'react'
import { Link } from 'react-router-dom'

function CustomLink({ text, path }) {
    return (
        <Link className="hover:text-link-hover hover:underline hover:underline-offset-4" to={path}>{text}</Link>
    )
}

export default CustomLink