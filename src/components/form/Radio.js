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

const Radio = ({ extraClasses, label, name, options, ...rest }) => {
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div >
            <label
                className={`mb-2 
            text-mobile-section-header
            ${lang === "EN" ?
                        'font-PoppinsMedium' :
                        'font-NotoSansJPMedium'}`}
                htmlFor={name}>{label}</label>
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
                                    <div className='flex items-center mb-1' key={o.key}>

                                        <input type="radio" id={o.value}
                                            {...field}
                                            value={o.value}
                                            checked={field.value === o.value}
                                            className={` me-2 
                                            rounded-full 
                                            ${extraClasses}`}
                                        /><label htmlFor={o.value}>{o.key}</label>
                                    </div>
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

export default Radio