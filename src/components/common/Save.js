import React from 'react'
import { AwesomeSolidHeart } from '../../styles/Icons'

function Save({ handleClick, parameter }) {
    return (
        <p className='shrink-0 cursor-pointer' onClick={() => handleClick(parameter)}><AwesomeSolidHeart size='lg' /></p>
    )
}

export default Save