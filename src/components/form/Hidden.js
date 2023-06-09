import React from 'react'
import { Field } from 'formik'

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const Hidden = ({ name, ...rest }) => {
    return (
        <div >
            <Field as="hidden" id={name} name={name} {...rest} />
        </div>
    )
}

export default Hidden