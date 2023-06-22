import React from "react"
import { v4 as uuid } from "uuid"
import { useSelector } from "react-redux"
import serverErrors from "../../text/serverErrors.json"
import { Exclamation } from "../../styles/Icons"

/* Takes an argument msg and makes a component for the error that goes underneath the inputs */

const ServerError = ({ msg, title }) => {
    const lang = useSelector(state => state.langFont.lang)

    return (
        <div className="text-error border rounded-ml p-4 mb-8 max-w-[400px]">
            <div className="flex mb-2 justify-center">
                <Exclamation />
                <span className={`ms-5 text-mobile-section-header ${lang === "EN" ? 'font-PoppinsMedium' : "font-NotoSansJPMedium"}`}>{title}</span>
            </div>

            {msg.map(m =>
                <p className="text-black text-center text-mobile-body-3" key={uuid()}>
                    {lang === "EN" ? serverErrors[m] ?
                        serverErrors[m].EN : "not one i know of"
                        : serverErrors[m] ?

                            serverErrors[m].JA : "jap not one i know of"}
                </p>)}
        </div>
    )
}

export default ServerError