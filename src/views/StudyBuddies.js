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
import { AwesomeCheck } from "../styles/Icons"


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
    const people = [
        { key: 'Durward Reynolds', value: 'beg1' },
        { key: 'Kenton Towne', value: 'beg2' },
        { key: 'Therese Wunsch', value: 'beg3' },
        { key: 'Benedict Kessler', value: 'beg4' },
        { key: 'Katelyn Rohan', value: 'beg5' },
    ]
    const [selectedPeople, setSelectedPeople] = useState([])


    const handleSelectedLevel = (setFieldValue, val) => {

        console.log('to push', val);
        console.log('right now it is', selectedPeople)
        const [addDelete, newVal] = getValToSet(val);

        if (addDelete === 'add') {
            //just add it to the list
            console.log('setting this', val);
            setSelectedPeople(val);
            setFieldValue('language_level', val);
        } else {
            handleDeselect(newVal, setFieldValue);
        }
        setIsOpen(true);
    }

    function handleDeselect(newVal, setFieldValue) {
        //x is the key to delete
        console.log('newval', newVal);
        // const newVal = val.filter(v => v.value !== valToAddDelete)

        // console.log('is now', newVal)
        setSelectedPeople(newVal);
        setFieldValue('language_level', newVal)
        setIsOpen(true);
    }

    function getValToSet(val) {
        //for each object in array, compare the "values"
        //get "values" for the arrays

        const keysVal = val.map(v => Object.values(v)[1])
        const keysSelected = selectedPeople.map(v => Object.values(v)[1])
        const noDups = [...new Set(keysVal.concat(keysSelected))]

        if (keysVal.length === noDups.length) {
            const addDelete = 'add'
            return [addDelete, val]
        } else {
            const addDelete = 'delete'
            return [addDelete, val]
            //there is one duplicated in the val, find the duplicated value
            // let indexToDelete
            // let valToDelete
            // console.log('we are using val', val)
            // for (let i = 0; i < val.length - 1; i++) {
            //     for (let j = i + 1; j < val.length; j++) {
            //         console.log(val[i].value, val[j].value)

            //         if (val[i].value == val[j].value) {
            //             console.log('found it')
            //             indexToDelete = i
            //             valToDelete = val[i].value
            //             console.log(indexToDelete)
            //             break
            //         }
            //     }
            //     console.log('break from this too?')
            // }
            // const newVal = val.toSpliced(indexToDelete, 1)
            // const returnValue = newVal.filter(v => v.value !== valToDelete)
            // console.log('todelte', returnValue)
            // return [addDelete, returnValue]
            // console.log('new array is', x)
            // return [addDelete, val]
        }

        function isSelected(val) {
            for (let i = 0; i < selectedPeople.length - 1; i++) {
                if (val[i].value == selectedPeople[i].value) {
                    console.log('found it')
                    return true
                }
            }
            return false
        }



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
                                                    by='value'
                                                    value={selectedPeople}
                                                    onChange={(val) => handleSelectedLevel(form.setFieldValue, val)}
                                                    multiple
                                                // open={isOpen}
                                                >
                                                    {() => (

                                                        <>

                                                            <Listbox.Label className=''>Select language level</Listbox.Label>
                                                            <div className="relative">
                                                                <Listbox.Button
                                                                    onClick={() => setIsOpen(!isOpen)}
                                                                    // open={isOpen}
                                                                    className=''
                                                                >
                                                                    {selectedPeople.length < 1 ? "Select person" :
                                                                        `Selected (${selectedPeople.length})`}
                                                                </Listbox.Button>
                                                                <div className="">
                                                                    <Transition
                                                                        show={isOpen}
                                                                        as={React.Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                        // enter="transition duration-100 ease-out"
                                                                        // enterFrom="transform scale-95 opacity-0"
                                                                        // enterTo="transform scale-100 opacity-50"

                                                                        className="absolute mt-1 w-full p-2 pe-4 rounded-md"
                                                                    >
                                                                        <Listbox.Options
                                                                            static
                                                                            className='className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                                                            {people.map((person) => (
                                                                                <Listbox.Option key={person.value}
                                                                                    value={person}
                                                                                    className={({ active }) =>
                                                                                        `relative select-none cursor-pointer ps-4`
                                                                                    }
                                                                                >
                                                                                    {({ selected }) => (

                                                                                        <>
                                                                                            <span
                                                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                                    }`}
                                                                                            >

                                                                                                {person.key}
                                                                                            </span>
                                                                                            {selected ? (
                                                                                                <span className="absolute inset-y-0 left-0 flex items-center  text-amber-600">
                                                                                                    <AwesomeCheck />
                                                                                                </span>
                                                                                            ) : null}

                                                                                        </>
                                                                                    )

                                                                                    }

                                                                                </Listbox.Option>
                                                                            ))}
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </Listbox>
                                            } />
                                            {/* fieldarrayprops gives us push, pop, remove, unshift, form (with eveything) */}
                                            {/* {fieldarrayprops => {
                                                    const { push, remove, form } = fieldarrayprops
                                                    const { values } = form
                                                    const { language_level } = values
                                                    return (
                                                        < Listbox value={selectedPeople} onChange={(val) => handleSelectedLevel(form.setFieldValue, val)} multiple >
                                                            <Listbox.Button>
                                                                {selectedPeople.map((person) => person.name).join(', ')}
                                                            </Listbox.Button>
                                                            <Listbox.Options>
                                                                {people.map((person) => (
                                                                    <Listbox.Option key={person.id} value={person}>
                                                                        {person.name}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Listbox>

                                                    )
                                                }}

                                            </FieldArray> */}

                                            {/* <FormikControl control='listbox'
                                                label={pageText.FILTER_LANG_LEVEL}
                                                name='language_level'
                                                options={englishLevelOptions}
                                            /> */}
                                            {/* <div className="mb-4">
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
                            </div> */}
                                            {/* <div className="mb-4">
                                                <FormikControl
                                                    control='dropdown'
                                                    label={pageText.FILTER_LANG_LEVEL}
                                                    name='language_level'
                                                    options={englishLevelOptions} />
                                            </div> */}

                                            {/* <div className="mb-4">
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
                            </div> */}

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