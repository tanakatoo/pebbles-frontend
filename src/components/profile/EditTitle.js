import React from 'react'
import { AwesomeChevronLeft } from '../../styles/Icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditTitle({ title, backLink }) {
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div className='flex mx-4 py-4'>
            <div className='w-max'>
                <Link to={backLink}><AwesomeChevronLeft /></Link>
            </div>
            <div className='grow inline-flex justify-center'>
                <p className={`text-mobile-section-header font-medium`}>{title}</p>
            </div>
        </div>
    )
}

export default EditTitle