import React from 'react'
import { Link } from 'react-router-dom'

function CustomLinkUnderline({ text, path }) {
    return (
        <Link className="hover:text-link-hover underline underline-offset-2" to={path}>{text}</Link>
    )
}

export default CustomLinkUnderline