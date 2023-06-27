import React from 'react'
import dbText from "../../text/db.json"

function DisplayInfo({ label, lang, data, checkExists = true, jsonName }) {
    return (
        <>
            <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                {label}
            </p>
            {checkExists ?
                data ?
                    <p className='mt-2'>{dbText[jsonName][data][lang]}</p>
                    : ''
                :
                <p className='mt-2'>{data}</p>}
        </>
    )
}

export default DisplayInfo