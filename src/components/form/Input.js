import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "../form/errorComponents/TextError"

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const Input = ({ label, name, ...rest }) => {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Input