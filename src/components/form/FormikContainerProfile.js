import React, { useEffect, useState } from "react"
import {
    Formik, Form
} from "formik"
import * as Yup from "yup"
import profileSchema from "../form/validation/profileSchema"
import FormikControl from "./FormikControl"
import { v4 as uuid } from "uuid"
import { useSelector } from "react-redux"
import { Button } from "../button/Button"
import determineLocation from "../../helpers/determineLocation"
import UserApi from "../../api/user"
import { useDispatch } from "react-redux"
import { actionSaveProfile } from "../../reducers/actionCreator"
import useSetToken from "../../hooks/useSetToken"
import ServerError from "./ServerError"
import { useNavigate } from "react-router-dom"

const FormikContainerProfile = ({ pageText }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [savedValues, setSavedValues] = useState(null)
    const profile = useSelector(state => state.profile.profile)
    const lang = useSelector(state => state.langFont.lang)
    const [token = null] = useSetToken()

    useEffect(() => {
        //we have to add the location to the autocomplete text box separately
        setSavedValues({
            ...profile,
            location: {
                description: profile ? determineLocation(profile, lang) : '',//`${profile.city_en}, ${profile.state_en}, ${profile.country_en}`,
                place_id: ''
            }
        })
    }, [])


    const initialValues = {
        about: "",
        avatar: "",
        city_en: "",
        city_ja: "",
        country_en: "",
        country_ja: "",
        email: "",
        name: "",
        free_trial_start_date: "",
        state_en: "",
        state_ja: "",
        username: "",
        location: {
            description: '',
            place_id: ''
        }
    }
    const validationSchema = profileSchema
    const onSubmit = async (values, { setSubmitting }) => {


        try {
            setErrors([])
            console.log('submitting')
            const res = await UserApi.updateUserInfo(values)
            //call dispatch to set token in profileReducer
            dispatch(actionSaveProfile(values))

        } catch (e) {
            if (e instanceof TypeError) {
                //means server is down
                console.error('TypeError saving edit profile data', e)
                setErrors(["UNKNOWN"])
            } else {
                console.error('Error saving edit profile data', e)
                setErrors(e)
            }
        } finally {
            setSubmitting(false)
            navigate(`/users/${profile.username}`)
        }


    }

    return (
        <Formik
            initialValues={savedValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {formik => {
                return (
                    <div className="container flex flex-col mt-2 mx-auto">
                        {Object.keys(errors).length > 0 &&
                            <div className="inline-flex justify-center">
                                <ServerError msg={errors} title={pageText.ERROR_TITLE} />
                            </div>}
                        <Form >
                            <div className="mb-4">
                                <FormikControl control='input'
                                    type='text'
                                    label={pageText.USERNAME}
                                    name='username'
                                    extraClasses='bg-background disabled:opacity-75'
                                    disabled={true} />
                            </div>
                            <div className="mb-4">
                                <FormikControl control='input'
                                    type='text'
                                    label={pageText.NAME}
                                    name='name'
                                />
                            </div>
                            <div className="mb-4">
                                <FormikControl control='input'
                                    type='email'
                                    label={pageText.EMAIL}
                                    name='email'
                                />
                            </div>

                            <div className="mb-4">
                                <FormikControl control='textarea' label='About' name='about' rows="5" />
                            </div>
                            {/* <FormikControl control='dropdown' label='Time zones' name='timezone' options={timezoneDropdown} /> */}
                            {/* <FormikControl control='radio' label='Gender' name='gender' options={genderRadio} /> */}
                            {/* <FormikControl control='checkbox' label="Study buddy type" name='studyBuddyType' options={studyBuddyType} /> */}
                            <div className="mb-4">
                                <FormikControl control='autocompleteApi' label="Location" name='location' />
                            </div>
                            <div className="mb-24 mt-12 flex">
                                <Button lang={lang} type="submit" btnText={pageText.SAVE_BTN} extraClasses="grow" />
                            </div>
                        </Form>
                    </div>
                )
            }}
        </Formik >

    )
}

export default FormikContainerProfile