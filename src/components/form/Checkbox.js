import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "./errorComponents/TextError"

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const Checkbox = ({ label, name, options, ...rest }) => {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field name={name} {...rest} >
                {/* use render field props */}
                {
                    ({ field }) => {
                        // field gives us 4 things: the onBlur, onChange, value, name
                        //field props has a value property - this is the value of the entire form field, not the individual radio buttons
                        //we specify the individual radio button values in the input below
                        //so we check if the field is the same as this option value then check it

                        return (

                            options.map(o => {
                                return (
                                    <React.Fragment key={o.key}>
                                        <input type="checkbox" id={o.value}
                                            {...field}
                                            value={o.value}
                                            checked={field.value.includes(o.value)}
                                        /><label htmlFor={o.value}>{o.key}</label>
                                    </React.Fragment>
                                )
                            })
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Checkbox