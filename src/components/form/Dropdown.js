import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "./errorComponents/TextError"
import { useSelector } from 'react-redux'

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const Dropdown = ({ label, extraClasses, name, options, ...rest }) => {
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div className='flex flex-col w-full '>
            <label className={`mb-2 text-mobile-section-header font-medium`} htmlFor={name}>{label}</label>
            <Field as="select" id={name} name={name} {...rest}
                className={`w-full mb-2 rounded-ml py-3 ps-4 pe-12 text-black placeholder-gray ${extraClasses}`}>
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.key}</option>))
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Dropdown