import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "./errorComponents/TextError"
import DateView from "react-datepicker"

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const DatePicker = ({ label, name, ...rest }) => {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} >
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return <DateView id={name} {...field}{...rest}
                            selected={value}
                            onChange={val => setFieldValue(name, val)} />
                        //the onChange receives the value of this field
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default DatePicker