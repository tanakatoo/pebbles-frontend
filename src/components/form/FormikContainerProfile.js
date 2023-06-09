import React from "react"
import {
    Formik, Form
} from "formik"
import * as Yup from "yup"
import profileSchema from "../form/validation/profileSchema"
import FormikControl from "./FormikControl"


const FormikContainerProfile = ({ pageText }) => {
    console.log(pageText)
    const initialValues = {
        gender: '',
        email: '',
        username: '',
        timezone: '',
        bio: '',
        about: '',
        studyBuddyType: [],
        location: {
            description: '',
            place_id: ''
        }

    }
    const validationSchema = profileSchema
    const onSubmit = values => console.log('formdata', values)

    const timezoneDropdown = [
        { key: "Select a timezone", value: '' },
        { key: "timezone1 name", value: '1' },
        { key: "timezone2 name", value: '2' },
        { key: "timezone3 name", value: '3' }
    ]

    const genderRadio = [
        { key: "Not specified", value: '' },
        { key: "male", value: '1' },
        { key: "female", value: '2' }
    ]

    const studyBuddyType = [
        { key: "Study buddy", value: '1' },
        { key: "Language exchange", value: '2' },
        { key: "Volunteer", value: '3' }
    ]


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <Form>

                        <FormikControl control='input' type='text' label={pageText.USERNAME} name='username' />
                        <FormikControl control='textarea' label='About' name='about' rows="5" />
                        <FormikControl control='dropdown' label='Time zones' name='timezone' options={timezoneDropdown} />
                        <FormikControl control='radio' label='Gender' name='gender' options={genderRadio} />
                        <FormikControl control='checkbox' label="Study buddy type" name='studyBuddyType' options={studyBuddyType} />
                        <FormikControl control='autocompleteApi' label="Location" name='location' />
                        <button type="submit">Submit</button>
                    </Form>
                )
            }}
        </Formik >

    )
}

export default FormikContainerProfile