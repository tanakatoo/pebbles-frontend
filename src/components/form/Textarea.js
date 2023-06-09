import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "./errorComponents/TextError"

//each component needs a label, <Field>, and <ErrorMessage>


const Textarea = ({ label, name, ...rest }) => {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field as="textarea" id={name} name={name} {...rest} className="Textarea" />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Textarea