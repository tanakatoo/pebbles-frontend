import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "./errorComponents/TextError"
import { useSelector } from 'react-redux'
import { Switch } from "@headlessui/react"
import { v4 as uuid } from "uuid"

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const Toggle = ({ extraClasses = '', label, name, options, ...rest }) => {
    const lang = useSelector(state => state.langFont.lang)
    const handleChange = (setFieldValue, val) => {
        const toSet = !val
        setFieldValue('study_buddy_active', toSet)
    }

    return (
        <div>
            <Field name={name} {...rest} >
                {/* use render field props */}
                {
                    ({ field, form }) => {
                        // field gives us 4 things: the onBlur, onChange, value, name
                        //field props has a value property - this is the value of the entire form field, not the individual radio buttons
                        //we specify the individual radio button values in the input below
                        //so we check if the field is the same as this option value then check it

                        return (
                            options.map(o => {
                                return (
                                    <div className='' key={uuid()}>

                                        <Switch.Group>
                                            <div className="flex items-center">
                                                <Switch.Label className={` 
                                                            text-mobile-section-header
                                                            font-medium'} mr-4`}>{label}</Switch.Label>
                                                <Switch
                                                    checked={field.value}
                                                    onChange={() => handleChange(form.setFieldValue, field.value)}
                                                    className={`${field.value ? 'bg-primary' : 'bg-gray'
                                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                                >
                                                    <span
                                                        className={`${field.value ? 'translate-x-6' : 'translate-x-1 ms-1'
                                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                                    />
                                                </Switch>
                                            </div>
                                        </Switch.Group>

                                        {/* <input type="checkbox" id={(o.value === true || o.value === false) ? o.key : o.value}
                                                {...field}
                                                value={o.value}
                                                checked={Array.isArray(field.value) ? field.value.includes(o.value) : field.value === o.value}
                                                className={` me-2 
                                                        rounded-sm 
                                                        ${extraClasses}`}
                                            /><label
                                                htmlFor={(o.value === true || o.value === false) ? o.key : o.value}>{o.key}</label> */}

                                    </div>
                                )
                            })

                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div >
    )
}

export default Toggle