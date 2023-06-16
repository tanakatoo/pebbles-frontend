import React from "react"
import { v4 as uuid } from "uuid"
import { useSelector } from "react-redux"
import serverErrors from "../../text/serverErrors.json"

/* Takes an argument msg and makes a component for the error that goes underneath the inputs */

const ServerError = ({ msg }) => {
    const lang = useSelector(state => state.langFont.lang)
    console.log('in server error passed in is', msg)
    return (
        <div style={{ backgroundColor: 'red' }}>
            <p>This is the errors at the top you got so my app doesn't crash: </p>
            {msg.map(m =>
                <p key={uuid()}>
                    {lang === "EN" ? serverErrors[m] ?
                        serverErrors[m].EN : "not one i know of"
                        : serverErrors[m] ?

                            serverErrors[m].JA : "jap not one i know of"}
                </p>)}
        </div>
    )
}

export default ServerError