import React, { useState, useEffect } from 'react'
import { X } from '../../styles/Icons'
import flashMsg from "../../text/flashMessages.json"
import { useSelector } from 'react-redux'

function FlashMsg({ msg = null }) {
    const lang = useSelector(state => state.langFont.lang)
    const [pageText, setPageText] = useState(flashMsg[lang])
    const [message, setMessage] = useState(msg)

    const handleClear = () => {
        setMessage(null)
    }

    useEffect(() => {
        setPageText(flashMsg[lang]);
        setMessage(msg);
        //uncomment when ready
        // setTimeout(() =>
        //     setMessage(null), 5000)
    }, [msg, lang])

    return (
        <div>
            {message ? (
                <div className="m-4 p-3 flex shadow">
                    <p className={`grow ${lang === 'JA' ? 'font-NotoSansJPRegular' : ''}`}>
                        {`${pageText[message]}`}
                    </p>
                    <button onClick={handleClear}>
                        <X />
                    </button>

                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default FlashMsg