import React from 'react'
import { Timezone } from '../../styles/Icons'
import dbText from "../../text/db.json"

function StudyBuddyCardTopRight({ timeZone, lang }) {

    return (
        <>
            {
                timeZone ?
                    <div className='flex text-mobile-label-1 gap-1'>
                        <Timezone />
                        <p className={`${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                            {dbText.timezones[timeZone][lang]}</p>
                    </div >
                    : <></>
            }
        </>)
}

export default StudyBuddyCardTopRight