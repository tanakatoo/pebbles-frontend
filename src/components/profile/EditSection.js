import React from 'react'
import { AwesomeChevronRight } from '../../styles/Icons'

function EditSection({ title, lang }) {
    return (
        <div className='p-4 flex'>
            <p className={`grow ${lang === "JA" ? 'font-NotoSansJPMedium' : 'font-PoppinsMedium'}`}>{title}</p>
            <AwesomeChevronRight />
        </div >
    )
}

export default EditSection