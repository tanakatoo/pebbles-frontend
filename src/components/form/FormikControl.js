import React from "react";
import Input from "./Input";

// decide which of the different form fields should be rendered

const FormikControl = ({ control, ...rest }) => {
    switch (control) {
        case 'input': return <Input {...rest} />
        case 'textarea':
        case 'select':
        case 'radio':
        case 'checkbox':
        case 'date':
        default:
            return null
    }

}

export default FormikControl