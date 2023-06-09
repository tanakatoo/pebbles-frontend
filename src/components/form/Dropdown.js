import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "./errorComponents/TextError"

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const Dropdown = ({ label, name, options, ...rest }) => {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field as="select" id={name} name={name} {...rest} >
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.key}</option>))
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Dropdown