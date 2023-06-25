import React from 'react'
import { AwesomeChevronRight } from '../../styles/Icons'

function EditSection({ title }) {
    return (
        <div className='p-4 flex'>
            <p className='grow font-PoppinsMedium'>{title}</p>
            <AwesomeChevronRight />
        </div>
    )
}

export default EditSection