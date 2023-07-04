import React from 'react'
import usePageText from '../../hooks/usePageText'
import { Arc } from '../../styles/Icons'

function StatisticsCard({ numUsers, text, viaPercent }) {
    const [pageText, lang] = usePageText('dashboard')

    return (
        <div className='w-[171px] h-[144px] shadow-dropdown rounded-ml relative flex pt-3 flex-col justify-center items-center'>
            <div className='absolute left-4 top-4 z-0'><Arc /></div>
            <div className={`absolute z-10 bg-gold-4/20 w-full h-full`}></div>
            <div className={`absolute z-20 bg-gradient-to-l  from-white/20 from-10% ${viaPercent} via-white/75 to-70% to-white/40 w-full h-full`}></div>
            <div className='z-20'><p className='text-mobile-page-header font-medium  '>{numUsers} {pageText.STAT_USERS}</p></div>
            <p className='text-center text-mobile-card-body z-20 px-4'>{text}</p>


        </div>
    )
}

export default StatisticsCard