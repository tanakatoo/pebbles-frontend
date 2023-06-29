import React, { useEffect, useState } from "react"
import {
    Formik, Form
} from "formik"
import * as Yup from "yup"
import profileSchema from "./validation/profileSchema"
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
import dbText from "../../text/db.json"
import studyBuddySchema from "./validation/studyBuddySchema"
import { useNavigate, useLocation } from "react-router-dom"
import {
    useEnglishLevelDropdown,
    useAgeRangeDropdown,
    useGenderDropdown,
    useLanguageDropdown,
    useTimezoneDropdown,
    useLanguageRadios,
    useStudybuddyActive,
    useStudyBuddyCheckboxes
} from "../../helpers/studyBuddyDropdowns"

const FormikContainerStudyBuddy = ({ pageText }) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [savedValues, setSavedValues] = useState(null)
    const profile = useSelector(state => state.profile.profile)
    const lang = useSelector(state => state.langFont.lang)
    const [token = null] = useSetToken()
    const navigate = useNavigate()
    const location = useLocation()
    const englishLevelDropdowns = useEnglishLevelDropdown()
    const genderOptions = useGenderDropdown()
    const timezoneOptions = useTimezoneDropdown()
    const ageOptions = useAgeRangeDropdown()
    const languageOptions = useLanguageDropdown()
    const languageRadios = useLanguageRadios()
    const studyBuddyActiveCheckbox = useStudybuddyActive()
    const studyBuddyTypeOptions = useStudyBuddyCheckboxes()

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
        study_buddy_active: false,
        study_buddy_types: [],
        native_language: '',
        learning_language: '',
        language_level: '',
        study_buddy_purpose: "",
        study_buddy_bio: "",
        time_zone: "",
        age_range: "",
        gender: ""
    }

    const onSubmit = async (values, { setSubmitting }) => {
        try {

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

            navigate(`/users/${profile.username}`, {
                state: {
                    fromLocation: location.pathname
                }
            })
        }
    }

    return (
        <Formik
            initialValues={savedValues || initialValues}
            validationSchema={studyBuddySchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {formik => {
                console.log(formik)
                return (
                    <div className="container flex flex-col mt-4 mx-auto">
                        {Object.keys(errors).length > 0 &&
                            <div className="inline-flex justify-center">
                                <ServerError msg={errors} title={pageText.ERROR_TITLE} />
                            </div>}
                        <Form >
                            <div className="mb-4">
                                <FormikControl control='toggle'
                                    label={pageText.STUDY_BUDDY_JOIN_LABEL}
                                    name='study_buddy_active'
                                    options={studyBuddyActiveCheckbox} />

                            </div>

                            <div className="mb-4">
                                <FormikControl control='checkbox'
                                    label={pageText.BUDDY_TYPE}
                                    name='study_buddy_types'
                                    options={studyBuddyTypeOptions}
                                />
                            </div>

                            <div className="mb-4">
                                <FormikControl control='radio'
                                    label={pageText.NATIVE_LANG}
                                    name='native_language'
                                    options={languageRadios} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.LEARNING_LANG}
                                    name='learning_language'
                                    options={languageOptions} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.LANGUAGE_LEVEL}
                                    name='language_level'
                                    options={englishLevelDropdowns} />
                            </div>
                            <div className="mb-4">
                                <FormikControl control='textarea'
                                    type='textarea'
                                    label={pageText.PURPOSE}
                                    name='study_buddy_purpose'
                                    rows='5'
                                />
                            </div>

                            <div className="mb-4">
                                <FormikControl control='textarea'
                                    type='textarea'
                                    label={pageText.STUDY_WAY}
                                    name='study_buddy_bio'
                                    rows='5'
                                />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.TIME_ZONE}
                                    name='time_zone'
                                    options={timezoneOptions} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.AGE_RANGE}
                                    name='age_range'
                                    options={ageOptions} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.GENDER}
                                    name='gender'
                                    options={genderOptions} />
                            </div>
                            <div className="mb-24 mt-12 flex">
                                <Button type="submit" btnText='Save' extraClasses="grow" />
                            </div>
                        </Form>
                    </div>
                )
            }}
        </Formik >

    )
}

export default FormikContainerStudyBuddy