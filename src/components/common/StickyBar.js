import React from 'react'
import { AwesomeChevronLeft } from '../../styles/Icons'

function StickyBar({ action, onClick, onClickX, textColor = "text-error", backText = "Back" }) {
    return (
        <div className='p-5 bg-background flex items-center w-full'>
            <div className='grow cursor-pointer text-primary-dark' >
                <AwesomeChevronLeft onClick={onClickX} />
                <span className='ps-4' onClick={onClickX}>{backText}</span>
            </div>
            <span onClick={onClick} className={`cursor-pointer ${textColor} font-bold`}>{action}</span>
        </div>
    )
}

export default StickyBar