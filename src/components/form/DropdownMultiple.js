import React from 'react'
import { FieldArray, ErrorMessage, useField } from 'formik'
import TextError from "./errorComponents/TextError"
import { useSelector } from 'react-redux'
import { Listbox } from '@headlessui/react'


//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const DropdownMultiple = ({ name, label, options }) => {
    const lang = useSelector(state => state.langFont.lang)

    console.log(options)
    const CustomDropdownComponent = ({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...props
    }) => (

        <div>
            {console.log(field)}
            <Listbox value={field.value} onChange={val => field.onChange(val)} multiple={true}>
                <Listbox.Button className='border'>{field.value.length > 0 ? field.value : 'select one'}
                    {/* {options.map((l) => l.key).join(', ')} */}
                </Listbox.Button>
                <Listbox.Options>
                    {options.map((l) => (
                        <Listbox.Option key={l.value} value={l.value}>
                            {l.key}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );

    return (
        <div className='flex flex-col w-full '>
            <label className={`mb-2 text-mobile-section-header ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`} htmlFor={name}>{label}</label>
            <FieldArray id={name} name={name} component={CustomDropdownComponent}
                className={`w-full mb-2 rounded-ml py-3 ps-4 pe-12 text-black placeholder-gray`} />
            {/* {options.map(o => (
                    <option key={o.value} value={o.value}>{o.key}</option>))
                }
            </Field> */}
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default DropdownMultiple


