import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import usePageText from "../hooks/usePageText"
// import { useNavigate, useLocation } from "react-router-dom"
import StudyBuddyApi from "../api/studyBuddy"
import PageTitle from "../components/common/PageTitle"
import ServerError from "../components/form/ServerError"
import Spinner from "../components/common/Spinner"
import NoData from "../components/common/NoData"
import { v4 as uuid } from "uuid"
import Card from "../components/studyBuddy/Card"
import StudyBuddyCardUnderUsername from "../components/studyBuddy/StudyBuddyCardUnderUsername"
import StudyBuddyCardTopRight from "../components/studyBuddy/StudyBuddyCardTopRight"
import useNavigateToProfile from "../hooks/useNavigateToProfile"
import StudyBuddyCardBottom from "../components/studyBuddy/StudyBuddyCardBottom"
import { Dialog } from '@headlessui/react'
import { Button } from "../components/button/Button"
import SearchBar from "../components/common/SearchBar"
import { X } from "../styles/Icons"
import FormikControl from "../components/form/FormikControl"
import {
    Formik, Form
} from "formik"
import { Listbox, Transition } from "@headlessui/react";


import {
    useEnglishLevelDropdown,
    useAgeRangeDropdown,
    useGenderDropdown,
    useLanguageDropdown,
    useTimezoneDropdown,
    useStudyBuddyCheckboxes
} from "../helpers/studyBuddyDropdowns"

const StudyBuddies = () => {

    const lang = useSelector(state => state.langFont.lang)
    const pageText = usePageText("studyBuddy")
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])
    const goToProFile = useNavigateToProfile()
    const [isOpen, setIsOpen] = useState(false)
    const englishLevelOptions = useEnglishLevelDropdown()
    const genderOptions = useGenderDropdown()
    const timezoneOptions = useTimezoneDropdown()
    const ageOptions = useAgeRangeDropdown()
    const languageOptions = useLanguageDropdown()
    const studyBuddyTypeOptions = useStudyBuddyCheckboxes()
    const [isListBoxOpen, setIsListBoxOpen] = useState(false);
    const [selectedEnglishLevel, setSelectedEnglishLevel] = useState([]);

    const getStudyBuddies = async () => {
        try {
            setDoneGettingData(false);
            const res = await StudyBuddyApi.getStudyBuddies();
            console.log(res)
            setData(res);
            setDoneGettingData(true);

        } catch (e) {
            if (e instanceof TypeError) {
                //means server is down
                console.error(e)
                setErrors(["UNKNOWN"])
            } else {
                console.error(e)
                setErrors(e)
            }
        }
    }

    useEffect(() => {
        getStudyBuddies()
    }, [])

    const initialValues = {
        study_buddy_types: [],
        native_language: [],
        learning_language: [],
        language_level: [],
        time_zone: [],
        age_range: [],
        gender: []
    }

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            console.log('submitting with these values', values)
            // const res = await StudyBuddyApi.updateUserInfo(values)

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

    // function isSelected(value) {
    //     return selectedPersons.find((el) => el === value) ? true : false;
    // }

    // function handleSelect(value) {
    //     if (!isSelected(value)) {
    //         const selectedEnglishLevelUpdated = [
    //             ...selectedEnglishLevel,
    //             useLanguageDropdown.find((el) => el === value)
    //         ];
    //         setSelectedEnglishLevel(selectedEnglishLevelUpdated);
    //     } else {
    //         handleDeselect(value);
    //     }
    //     setIsListBoxOpen(true);
    // }

    // function handleDeselect(value) {
    //     const selectedEnglishLevelUpdated = selectedEnglishLevel.filter((el) => el !== value);
    //     setSelectedEnglishLevel(selectedEnglishLevelUpdated);
    //     setIsListBoxOpen(true);
    // }
    const people = [
        { id: 1, name: 'Durward Reynolds' },
        { id: 2, name: 'Kenton Towne' },
        { id: 3, name: 'Therese Wunsch' },
        { id: 4, name: 'Benedict Kessler' },
        { id: 5, name: 'Katelyn Rohan' },
    ]

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-white/75" aria-hidden="true" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full max-w-full p-4 justify-center">
                        <Dialog.Panel className="grow max-w-[500px] h-full rounded shadow-xl bg-background p-4">
                            <div className="flex justify-end p-4">
                                <X classes='cursor-pointer'
                                    onClick={() => setIsOpen(false)} />
                            </div>
                            <Dialog.Title className='font-bold text-center text-mobile-page-header pt-4 mb-5'>
                                Filter study buddies
                            </Dialog.Title>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                            >
                                {formik => {
                                    console.log(formik)
                                    return (
                                        <Form className="flex flex-col">
                                            <Listbox value={selectedEnglishLevel} onChange={setSelectedEnglishLevel} multiple>
                                                <Listbox.Button>
                                                    {selectedEnglishLevel.map((l) => l.name).join(', ')}
                                                </Listbox.Button>
                                                <Listbox.Options>
                                                    {people.map((l) => (
                                                        <Listbox.Option key={l.id} value={l}>
                                                            {l.name}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Listbox>dfd
                                            <div className="mb-4">
                                                <FormikControl control='checkbox'
                                                    label={pageText.FILTER_TYPE}
                                                    name='study_buddy_types'
                                                    options={studyBuddyTypeOptions}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <FormikControl
                                                    control='dropdown'
                                                    label={pageText.FILTER_NATIVE_LANG}
                                                    name='native_language'
                                                    options={languageOptions} />

                                            </div>
                                            <div className="mb-4">

                                                <FormikControl
                                                    control='dropdown'
                                                    label={pageText.FILTER_LEARN_LANG}
                                                    name='learning_language'
                                                    options={languageOptions} />
                                            </div>
                                            <div className="mb-4">
                                                <FormikControl
                                                    control='dropdown'
                                                    label={pageText.FILTER_LANG_LEVEL}
                                                    name='language_level'
                                                    options={englishLevelOptions} />
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
                                                    label={pageText.FILTER_AGE_RANGE}
                                                    name='age_range'
                                                    options={ageOptions} />
                                            </div>
                                            <div className="mb-4">
                                                <FormikControl
                                                    control='dropdown'
                                                    label={pageText.FILTER_GENDER}
                                                    name='gender'
                                                    options={genderOptions} />
                                            </div>
                                            <div className="mb-24 mt-12 flex">
                                                <Button type="submit" btnText='Save' extraClasses="grow" />
                                            </div>
                                        </Form>

                                    )
                                }}
                            </Formik >
                            {/* <div className="mt-2">
                                <FilterCheckbox lang={lang}
                                    options={studyBuddyTypeOptions}
                                    label={pageText.FILTER_TYPE}
                                    name={'types'}
                                />
                            </div>
                            <div className="mt-2">
                                <FilterSelect lang={lang}
                                    options={languageOptions}
                                    label={pageText.FILTER_NATIVE_LANG}
                                    name={'native_lang'}
                                />
                            </div>
                            <div className="mt-2">
                                <FilterSelect lang={lang}
                                    options={languageOptions}
                                    label={pageText.FILTER_LEARN_LANG}
                                    name={'learn_lang'}
                                />
                            </div>
                            <FilterSelect lang={lang}
                                options={englishLevelOptions}
                                label={pageText.FILTER_LANG_LEVEL}
                                name={'language'}
                            />
                            <div className="mt-2">
                                <FilterSelect lang={lang}
                                    options={genderOptions}
                                    label={pageText.FILTER_GENDER}
                                    name={'gender'}
                                />
                            </div>
                            <div className="mt-2">
                                <FilterSelect lang={lang}
                                    options={timezoneOptions}
                                    label={pageText.TIME_ZONE}
                                    name={'timezone'}
                                />
                            </div>
                            <div className="mt-2">
                                <FilterSelect lang={lang}
                                    options={ageOptions}
                                    label={pageText.FILTER_AGE_RANGE}
                                    name={'age'}
                                />
                            </div>

                            <p>
                                Are you sure you want to deactivate your account? All of your data
                                will be permanently removed. This action cannot be undone.
                            </p>

                            <button onClick={() => setIsOpen(false)}>Deactivate</button>
                            <button onClick={() => setIsOpen(false)}>Cancel</button> */}
                        </Dialog.Panel>
                    </div >
                </div>


            </Dialog >
            <div className={`border-t border-t-gray-stroke `}>
                <PageTitle text={pageText.TITLE}
                    extraClasses={`${lang === "EN" ? 'font-StudyBuddyEN' : 'font-StudyBuddyJA'}
                    my-3`} />
                {errors.length > 0 && <ServerError msg={errors} />}
                {!data && errors.length === 0 && doneGettingData === false ?
                    <div className=' my-24'>
                        <Spinner />
                    </div>
                    : doneGettingData === true && data.length === 0 ?
                        <div className='my-12'>
                            < NoData msg={pageText.NO_USERS_MSG} link='/users/saved' linkText={pageText.NO_USERS_LINK_TXT} />
                        </div>
                        :
                        <>
                            <div className="w-full px-4 mb-3">
                                <SearchBar btn={
                                    <Button btnText='Filter'
                                        bkColor='bg-study-buddy-accent'
                                        textColor='text-primary-dark'
                                        px='px-8'
                                        clickMethod={() => setIsOpen(true)} />

                                } />
                            </div>
                            <div className='mt-4 flex flex-wrap justify-center mb-12 gap-4 px-2'>
                                {data.map(d =>
                                    <Card data={d}
                                        goToProfileOnClick={goToProFile}
                                        key={uuid()}
                                        buddy={true}
                                        topRight={<StudyBuddyCardTopRight timeZone={d.time_zone} lang={lang} />}
                                        underUsername={<StudyBuddyCardUnderUsername data={d} lang={lang} pageText={pageText} />}
                                        bottom={<StudyBuddyCardBottom data={d} lang={lang} />}
                                    />)}

                            </div>
                        </>
                }
            </div >
        </>
    )
}

export default StudyBuddies