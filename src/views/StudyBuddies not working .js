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
    Formik, Form, FieldArray, Field
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
import DropdownMultiple from "../components/form/DropdownMultiple"

const StudyBuddies = () => {

    const lang = useSelector(state => state.langFont.lang)
    const pageText = usePageText("studyBuddy")
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])
    const goToProFile = useNavigateToProfile()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const englishLevelOptions = useEnglishLevelDropdown()
    const genderOptions = useGenderDropdown()
    const timezoneOptions = useTimezoneDropdown()
    const ageOptions = useAgeRangeDropdown()
    const languageOptions = useLanguageDropdown()
    const studyBuddyTypeOptions = useStudyBuddyCheckboxes()
    const [isOpen, setIsOpen] = useState(false)


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

    const peopleOriginal = [
        { key: 'Durward Reynolds', value: 'beg1' },
        { key: 'Kenton Towne', value: 'beg2' },
        { key: 'Therese Wunsch', value: 'beg3' },
        { key: 'Benedict Kessler', value: 'beg4' },
        { key: 'Katelyn Rohan', value: 'beg5' },
    ]
    const people = ['beg1', 'beg2',
        'beg3',
        'beg4',
        'beg5']

    const [selectedPeople, setSelectedPeople] = useState([])


    const handleSelectedLevel = (setFieldValue, val) => {
        if (!isSelected(val)) {
            console.log(val);
            const selectedPersonsUpdated = [
                ...selectedPeople,
                people.find((el) => el === val)
            ];
            setSelectedPeople(selectedPersonsUpdated);
        } else {
            handleDeselect(val, setFieldValue);
        }
        setIsOpen(true)
    }

    function handleDeselect(val, setFieldValue) {
        //x is the key to delete
        const selectedPersonsUpdated = selectedPeople.filter((el) => el !== val);
        setSelectedPeople(selectedPersonsUpdated);
        setFieldValue(val)
        setIsOpen(true);
    }

    function isSelected(val) {
        return selectedPeople.find((el) => el === val) ? true : false;
        //for each object in array, compare the "values"
        //get "values" for the arrays

        // const keysVal = val.map(v => Object.values(v)[1])
        // const keysSelected = selectedPeople.map(v => Object.values(v)[1])
        // const noDups = [...new Set(val.concat(selectedPeople))]

        // if (val.length === noDups.length) {
        //     const addDelete = 'add'
        //     return [addDelete, val]
        // } else {
        //     const addDelete = 'delete'
        //     //there is one duplicated in the val, find the duplicated value
        //     let indexToDelete
        //     let valToDelete
        //     console.log('we are using val', val)
        // for (let i = 0; i < val.length - 1; i++) {
        //     for (let j = i + 1; j < val.length; j++) {

        //         if (val[i] == val[j]) {
        //             console.log('found it')
        //             indexToDelete = i
        //             valToDelete = val
        //             console.log(indexToDelete)
        //             break
        //         }
        //     }
        //     console.log('break from this too?')
        // }
        // const newVal = val.toSpliced(indexToDelete, 1)
        // const returnValue = newVal.filter(v => v !== valToDelete)
        // console.log('todelte', returnValue)
        // return [addDelete, returnValue]
        // console.log('new array is', x)
        // return [addDelete, val]




        //add the 2 arrays and find 
        // console.log(keysVal, keysSelected)
        // let returnValue = 'false'
        // //am I adding one or deselecting one?
        // if (keysVal > keysSelected) {
        //     //i am adding one

        // }
        // for (let i = 0; i < keysVal.length; i++) {
        //     console.log('v is', keysVal[i])
        //     console.log('index of keyselected and val', keysSelected.indexOf(keysVal[i]))
        //     if (keysSelected.indexOf(keysVal[i]) !== -1) {
        //         //-1 means we found the same key in the already selected list
        //         console.log('foudn it!')
        //         console.log('returning the key', keysVal[i])
        //         //return the key to delete
        //         returnValue = keysVal[i]
        //         break

        //     }

        // }
        // keysVal.forEach(v => {
        //     console.log('v is', v)
        //     console.log('index of keyselected and val', keysSelected.indexOf(v !== -1))
        //     if (keysSelected.indexOf(v) !== -1) {
        //         //-1 means we found the same key in the already selected list
        //         console.log('foudn it!')
        //         console.log('returning the key', v)
        //         //return the key to delete
        //         returnValue = v

        //     }
        //     if (returnValue !== 'false') {

        //     }

        // })

        //returns false if we didn't find anything and need to add it to the selected list
        // return returnValue
    }
    console.log('is open is', isOpen)
    return (
        <>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-white/75" aria-hidden="true" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full max-w-full p-4 justify-center">
                        <Dialog.Panel className="grow max-w-[500px] h-full rounded shadow-xl bg-background p-4">
                            <div className="flex justify-end p-4">
                                <X classes='cursor-pointer'
                                    onClick={() => setIsDialogOpen(false)} />
                            </div>
                            <Dialog.Title className='font-bold text-center text-mobile-page-header pt-4 mb-5'>
                                Filter study buddies
                            </Dialog.Title>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                            >
                                {formik => {
                                    console.log('this is formik', formik)

                                    return (
                                        <Form className="flex flex-col">

                                            <Field name="language_level" component={({ form }) =>
                                                < Listbox as='div'
                                                    value={selectedPeople}
                                                    onChange={(val) => handleSelectedLevel(form.setFieldValue, val)}
                                                    multiple
                                                // open={isOpen}
                                                >
                                                    {() => (
                                                        <>
                                                            <Listbox.Label className=''>Select language level</Listbox.Label>
                                                            <div className="relative">
                                                                <span className="inline-block w-full rounded-md shadow-sm">
                                                                    <Listbox.Button
                                                                        onClick={() => setIsOpen(!isOpen)}
                                                                        open={isOpen}
                                                                        className=''
                                                                    >

                                                                        {selectedPeople.length < 1 ? "Select person" :
                                                                            `Selected (${selectedPeople.length})`}
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <svg
                                                                                className="h-5 w-5 text-gray-400"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </svg>
                                                                        </span>
                                                                    </Listbox.Button>
                                                                </span>
                                                                <Transition
                                                                    unmount={false}
                                                                    show={isOpen}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                    className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                                                                >
                                                                    <Listbox.Options
                                                                        static
                                                                        className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                                                                    >
                                                                        {people.map((person) => {
                                                                            const selected = isSelected(person);
                                                                            return (
                                                                                <Listbox.Option key={person} value={person}>
                                                                                    {({ active }) => (
                                                                                        <div
                                                                                            className={`${active
                                                                                                ? "text-white bg-primary"
                                                                                                : "text-gray"
                                                                                                } cursor-default select-none relative py-2 pl-8 pr-4`}
                                                                                        >
                                                                                            <span
                                                                                                className={`${selected ? "font-semibold" : "font-normal"
                                                                                                    } block truncate`}
                                                                                            >
                                                                                                {person}
                                                                                            </span>
                                                                                            {selected && (
                                                                                                <span
                                                                                                    className={`${active ? "text-white" : "text-primary"
                                                                                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                                                                >
                                                                                                    <svg
                                                                                                        className="h-5 w-5"
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        viewBox="0 0 20 20"
                                                                                                        fill="currentColor"
                                                                                                    >
                                                                                                        <path
                                                                                                            fillRule="evenodd"
                                                                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                                            clipRule="evenodd"
                                                                                                        />
                                                                                                    </svg>
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                </Listbox.Option>
                                                                            );
                                                                        })}
                                                                    </Listbox.Options>
                                                                </Transition>
                                                            </div>
                                                        </>
                                                    )}
                                                </Listbox>
                                            } />

                                        </Form>

                                    )
                                }}
                            </Formik >
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
                                        clickMethod={() => setIsDialogOpen(true)} />

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