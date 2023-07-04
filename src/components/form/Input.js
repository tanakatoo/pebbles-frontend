import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "../form/errorComponents/TextError"
import { useSelector } from 'react-redux'


//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password


const Input = ({ extraClasses, disabled = false, label, name, ...rest }) => {
    const lang = useSelector(state => state.langFont.lang)

    return (
        <div className='flex flex-col w-full'>
            <label className={`mb-2 
            text-mobile-section-header
            font-medium`}
                htmlFor={name}>{label}</label>
            <Field className={`mb-2 
            rounded-ml py-3 px-4 text-black
             placeholder-gray
             ${extraClasses}`}
                id={name}
                name={name}
                {...rest}
                disabled={disabled} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Input