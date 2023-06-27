import React, { forwardRef } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from "./errorComponents/TextError"
import { useSelector } from 'react-redux'

//each component needs a label, <Field>, and <ErrorMessage>


const Textarea = ({ label, extraClasses, name, ...rest }) => {
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div className='flex flex-col w-full'>
            <label className={`mb-2 text-mobile-section-header ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`} htmlFor={name}>{label}</label>
            <Field as="textarea" id={name} name={name} {...rest}
                className={`mb-2 rounded-ml py-3 px-4 text-black placeholder-gray ${extraClasses}`} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Textarea