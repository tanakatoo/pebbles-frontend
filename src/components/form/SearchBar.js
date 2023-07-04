import React from 'react'
import { useSelector } from 'react-redux'
import searchText from "../../text/searchBar.json"
import { Button } from '../button/Button'
import { Field, ErrorMessage } from 'formik'
import TextError from "../form/errorComponents/TextError"

function SearchBar({ name, btn = false, onSubmit, placeholder }) {
    const lang = useSelector(state => state.langFont.lang)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('go search')
            onSubmit()
        }
    }

    return (
        <div className={`w-full flex  ${btn ? 'flex-col-reverse md:flex-row' : null} gap-3`}>
            {btn ? btn : null}
            <Field className={`rounded-ml border-gray px-2 py-2 border-2 grow placeholder-gray`}
                id={name} name={name} placeholder={placeholder} >

            </Field>
            <ErrorMessage name={name} component={TextError} />

        </div>
    )
}

export default SearchBar