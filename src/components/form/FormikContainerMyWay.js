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
import { useNavigate } from "react-router-dom"

const FormikContainerMyWay = ({ pageText }) => {
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
        myway_advice: "",
        raz_reading_level: "",
        myway_habits: "",
        goals: [],
        motivational_level: "",
        myway_language_level: "",
        study_time: ""
    }

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            setErrors([])
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

    const englishLevelDropdown = [
        { key: pageText.SELECT_LANG_LEVEL, value: '' },
        { key: dbText.language_levels.Beginner[lang], value: 'Beginner' },
        { key: dbText.language_levels.Intermediate[lang], value: 'Intermediate' },
        { key: dbText.language_levels.Advanced[lang], value: 'Advanced' }
    ]

    const motivationDropdown = [
        { key: pageText.SELECT_MOTIVATION_LEVEL, value: '' },
        { key: dbText.motivation_levels.Very[lang], value: 'Very' },
        { key: dbText.motivation_levels.Average[lang], value: 'Average' },
        { key: dbText.motivation_levels.Low[lang], value: 'Low' },
        { key: dbText.motivation_levels.None[lang], value: 'None' }
    ]

    const studyTimeDropdown = [
        { key: pageText.SELECT_STUDY_TIME, value: '' },
        { key: dbText.study_times.everyday[lang], value: 'everyday' },
        { key: dbText.study_times.three[lang], value: 'three' },
        { key: dbText.study_times.once[lang], value: 'once' },
        { key: dbText.study_times.notFrequent[lang], value: 'notFrequent' },
        { key: dbText.study_times.never[lang], value: 'never' }
    ]

    const goalsCheckboxes = [
        { key: dbText.goals.Vocabulary[lang], value: 'Vocabulary' },
        { key: dbText.goals.Pronunciation[lang], value: 'Pronunciation' },
        { key: dbText.goals.Listening[lang], value: 'Listening' },
        { key: dbText.goals.Writing[lang], value: 'Writing' },
        { key: dbText.goals.Speaking[lang], value: 'Speaking' }
    ]


    if (lang === "EN") {
        return (
            <div className="container mx-auto">
                <p className="text-center py-12">MyWay is a service for Premium Japanese users to help them develop a plan to self study English.
                    We currently do not have the same service for English users.</p>
            </div>
        )
    }
    return (
        <Formik
            initialValues={savedValues || initialValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {formik => {
                return (
                    <div className="container flex flex-col mt-4 mx-auto">
                        {Object.keys(errors).length > 0 &&
                            <div className="inline-flex justify-center">
                                <ServerError msg={errors} title={pageText.ERROR_TITLE} />
                            </div>}
                        <Form >
                            {profile.role === "admin" ?
                                <>
                                    <div className="mb-4">
                                        <FormikControl control='textarea'
                                            type='textarea'
                                            label={pageText.ADVICE}
                                            name='myway_advice'
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <FormikControl control='input'
                                            type='text'
                                            label={pageText.READING_LEVEL}
                                            name='raz_reading_level'
                                        />
                                    </div>
                                </>
                                : ''}
                            <div className="mb-4">
                                <FormikControl control='textarea'

                                    label={pageText.HABITS}
                                    name='myway_habits'
                                    rows="5"
                                />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.MYWAY_LANGUAGE_LEVEL}
                                    name='myway_language_level'
                                    options={englishLevelDropdown} />
                            </div>
                            <div className="mb-4">
                                <FormikControl control='checkbox'
                                    label={pageText.GOALS}
                                    name='goals'
                                    options={goalsCheckboxes} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.MOTIVATION}
                                    name='motivational_level'
                                    options={motivationDropdown} />
                            </div>
                            <div className="mb-4">
                                <FormikControl
                                    control='dropdown'
                                    label={pageText.SELF_STUDY}
                                    name='study_time'
                                    options={studyTimeDropdown} />
                            </div>
                            {/* <FormikControl control='radio' label='Gender' name='gender' options={genderRadio} /> */}


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

export default FormikContainerMyWay