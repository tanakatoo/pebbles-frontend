import React from "react"
import { v4 as uuid } from "uuid"
import { useSelector } from "react-redux"

/* Takes an argument msg and makes a component for the error that goes underneath the inputs */

const InputError = ({ msg }) => {
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div style={{ backgroundColor: 'red' }}>
            <p>This is the errors at the top you got so my app doesn't crash: </p>
            {msg.map(m => <p key={uuid()}>{lang === "EN" ? m.EN : m.JA}</p>)}
        </div>
    )
}

export default InputError