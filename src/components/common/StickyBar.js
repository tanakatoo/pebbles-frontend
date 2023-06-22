import React from 'react'
import { AwesomeChevronLeft } from '../../styles/Icons'

function StickyBar({ action, onClick, onClickX, textColor = "text-error" }) {
    return (
        <div className='p-5 bg-background flex items-center w-full'>
            <div className='grow cursor-pointer text-primary-dark' >
                <AwesomeChevronLeft onClick={onClickX} />
                <span className='ps-4' onClick={onClickX}>Back</span>
            </div>
            <span onClick={onClick} className={`cursor-pointer ${textColor} font-bold`}>{action}</span>
        </div>
    )
}

export default StickyBar