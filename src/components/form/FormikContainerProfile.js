import React from "react"
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import profileSchema from "../form/validation/profileSchema"
import FormikControl from "./FormikControl"

const FormikContainerProfile = () => {
    const initialValues = {
        gender: '',
        email: '',
        username: '',
        timezone: ''

    }
    const validationSchema = profileSchema
    const onSubmit = values => console.log('formdata', values)

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                <Form>
                    <FormikControl control='input' type='text' label='Username' name='username' />
                    <button type="submit">Submit</button>
                </Form>
            }}
        </Formik>

    )
}

export default FormikContainerProfile