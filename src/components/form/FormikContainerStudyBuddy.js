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


const FormikContainerStudyBuddy = ({ pageText }) => {
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
        study_buddy_active: false,
        study_buddy_types: [],
        native_language: lang === "EN" ? 'English' : 'Japanese',
        learning_language: lang === "EN" ? 'Japanese' : 'English',
        language_level: '',
        study_buddy_purpose: "",
        study_buddy_bio: "",
        time_zone: "",
        age_range: "",
        gender: ""
    }

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            console.log('submitting', values)
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
        }
    }

    const studybuddyActive = [
        { key: pageText.STUDY_BUDDY_ACTIVE, value: true }
    ]

    const englishLevelDropdown = [
        { key: pageText.SELECT_LANG_LEVEL, value: '' },
        { key: dbText.language_levels.Beginner[lang], value: 'Beginner' },
        { key: dbText.language_levels.Intermediate[lang], value: 'Intermediate' },
        { key: dbText.language_levels.Advanced[lang], value: 'Advanced' }
    ]

    const timezoneDropdown = [
        { key: pageText.SELECT_TIME_ZONE, value: '' },
        { key: dbText.timezones.LosAngeles[lang], value: 'LosAngeles' },
        { key: dbText.timezones.Chicago[lang], value: 'Chicago' },
        { key: dbText.timezones.NewYork[lang], value: 'NewYork' },
        { key: dbText.timezones.Toronto[lang], value: 'Toronto' },
        { key: dbText.timezones.SaoPaulo[lang], value: 'SaoPaulo' },
        { key: dbText.timezones.London[lang], value: 'London' },
        { key: dbText.timezones.Paris[lang], value: 'Paris' },
        { key: dbText.timezones.Zurich[lang], value: 'Zurich' },
        { key: dbText.timezones.Cairo[lang], value: 'Cairo' },
        { key: dbText.timezones.Moscow[lang], value: 'Moscow' },
        { key: dbText.timezones.Dubai[lang], value: 'Dubai' },
        { key: dbText.timezones.HongKong[lang], value: 'HongKong' },
        { key: dbText.timezones.Shanghai[lang], value: 'Shanghai' },
        { key: dbText.timezones.Singapore[lang], value: 'Singapore' },
        { key: dbText.timezones.Tokyo[lang], value: 'Tokyo' },
        { key: dbText.timezones.Sydney[lang], value: 'Sydney' }
    ]

    const studyBuddyCheckboxs = [
        { key: dbText.study_buddy_types.StudyBuddy[lang], value: 'StudyBuddy' },
        { key: dbText.study_buddy_types.LanguageExchange[lang], value: 'LanguageExchange' },
        { key: dbText.study_buddy_types.Volunteer[lang], value: 'Volunteer' }
    ]

    const languageRadios = [
        { key: dbText.languages.English[lang], value: 'English' },
        { key: dbText.languages.Japanese[lang], value: 'Japanese' }
    ]

    const genderDropdown = [
        { key: pageText.SELECT_GENDER, value: '' },
        { key: dbText.genders.male[lang], value: 'male' },
        { key: dbText.genders.female[lang], value: 'female' },
        { key: dbText.genders.other[lang], value: 'other' }
    ]

    const ageRangeDropdown = [
        { key: pageText.SELECT_AGE_RANGE, value: '1' },
        { key: dbText.age_ranges['18-25'][lang], value: '18-25' },
        { key: dbText.age_ranges['26-35'][lang], value: '26-35' },
        { key: dbText.age_ranges['36-45'][lang], value: '36-45' },
        { key: dbText.age_ranges['46-59'][lang], value: '46-59' },
        { key: dbText.age_ranges['60+'][lang], value: '60+' }
    ]


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
                                    options={studybuddyActive} />

                            </div>

                            <div className="mb-4">
                                <FormikControl control='checkbox'
                                    label={pageText.BUDDY_TYPE}
                                    name='study_buddy_types'
                                    options={studyBuddyCheckboxs}
                                />
                            </div>

                            <div className="mb-4">
                                <FormikControl control='radio'
                                    label={pageText.NATIVE_LANG}
                                    name='native_language'
                                    options={languageRadios} />
                            </div>
                            <div className="mb-4">
                                <FormikControl control='radio'
                                    label={pageText.LEARNING_LANG}
                                    name='learning_language'
                                    options={languageRadios} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.LANGUAGE_LEVEL}
                                    name='language_level'
                                    options={englishLevelDropdown} />
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
                                    options={timezoneDropdown} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.AGE_RANGE}
                                    name='age_range'
                                    options={ageRangeDropdown} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.GENDER}
                                    name='gender'
                                    options={genderDropdown} />
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