import React from 'react'
import { AwesomeChevronRight } from '../../styles/Icons'

function EditSection({ title, lang }) {
    return (
        <div className='p-4 flex'>
            <p className={`grow font-medium`}>{title}</p>
            <AwesomeChevronRight />
        </div >
    )
}

export default EditSection