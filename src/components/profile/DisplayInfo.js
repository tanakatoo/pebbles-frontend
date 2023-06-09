import React from 'react'
import dbText from "../../text/db.json"

function DisplayInfo({ label, lang, data, checkExists = true, jsonName }) {

    return (
        <>
            <p className={`mt-6 text-mobile-section-header font-medium`}>
                {label}
            </p>
            {checkExists ?
                data ?
                    <p className={`mt-2 ${data ? 'bg-background rounded-ml p-2' : ''}`}>{dbText[jsonName][data][lang]}</p>
                    :
                    data !== '' ?
                        <p className={`mt-2 ${data ? 'bg-background rounded-ml p-2' : ''}`}>{data}</p>
                        : ''
                : (Array.isArray(data) && data.length > 0) || (!Array.isArray(data) && data !== '') ?
                    <p className={`mt-2 ${data ? 'bg-background rounded-ml p-2' : ''}`}>{data}</p>
                    : ''}
        </>
    )
}

export default DisplayInfo