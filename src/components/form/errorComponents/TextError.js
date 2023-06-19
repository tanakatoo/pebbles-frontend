import React from "react"
import { useSelector } from "react-redux"
import errorsText from '../../../text/errors.json'

const TextError = (props) => {
    const lang = useSelector(state => state.langFont.lang)
    const errorText = errorsText[lang][props.children]

    return (
        <div className="text-error ">
            {errorText}
        </div>
    )
}
export default TextError