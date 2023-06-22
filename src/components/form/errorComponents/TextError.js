import React from "react"
import { useSelector } from "react-redux"
import errorsText from '../../../text/errors.json'
import { Exclamation } from "../../../styles/Icons"

const TextError = (props) => {
    const lang = useSelector(state => state.langFont.lang)
    const errorText = errorsText[lang][props.children]

    return (
        <div className={`text-error flex gap-2`}>
            {props.exclamation && <Exclamation />}
            <span>{errorText}</span>
        </div>
    )
}
export default TextError