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

const Checkbox = ({ extraClasses = '', label, name, options, ...rest }) => {
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div className='flex flex-col w-full'>

            <label className={`mb-2 
            text-mobile-section-header
            ${lang === "EN" ?
                    'font-PoppinsMedium' :
                    'font-NotoSansJPMedium'}`} htmlFor={name}>{label}</label>
            <div>
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
                                            <input type="checkbox" id={(o.value === true || o.value === false) ? o.key : o.value}
                                                {...field}
                                                value={o.value}
                                                checked={Array.isArray(field.value) ? field.value.includes(o.value) : field.value === o.value}
                                                className={` me-2 
                                                        rounded-sm 
                                                        ${extraClasses}`}
                                            /><label
                                                htmlFor={(o.value === true || o.value === false) ? o.key : o.value}>{o.key}</label>

                                        </div>
                                    )
                                })
                            )
                        }
                    }
                </Field>
                <ErrorMessage name={name} component={TextError} />
            </div>
        </div>
    )
}

export default Checkbox