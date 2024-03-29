import React, { useEffect, useRef, useState } from "react"
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
import SearchBar from "../components/form/SearchBar"
import { X, AwesomeFilterX, AwesomeFilter } from "../styles/Icons"
import FormikControl from "../components/form/FormikControl"
import { Formik, Form } from "formik"
import { Filter } from "../styles/Icons"
import {
    useEnglishLevelOptions,
    useAgeRangeOptions,
    useGenderOptions,
    useLanguageOptions,
    useTimezoneOptions,
    useStudyBuddyTypeOptions
} from "../helpers/studyBuddyDropdowns"

const StudyBuddies = () => {
    const [pageText, lang] = usePageText("studyBuddy")
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])
    const goToProFile = useNavigateToProfile()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const englishLevelOptions = useEnglishLevelOptions()
    const genderOptions = useGenderOptions()
    const timezoneOptions = useTimezoneOptions()
    const ageOptions = useAgeRangeOptions()
    const languageOptions = useLanguageOptions()
    const studyBuddyTypeOptions = useStudyBuddyTypeOptions()
    const [numFilters, setNumFilters] = useState(false)

    const getStudyBuddies = async () => {
        try {
            setErrors([])
            setDoneGettingData(false);
            const res = await StudyBuddyApi.getStudyBuddies();

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

        window.scrollTo(0, 0)
        getStudyBuddies()
    }, [])

    const initialValues = {
        study_buddy_types: [],
        native_language: [],
        learning_language: [],
        language_level: [],
        time_zone: [],
        age_range: [],
        gender: [],
        searchWord: ''
    }


    const onSubmit = async (values, { setSubmitting }) => {
        try {

            setIsDialogOpen(false)
            setErrors([])
            setData([])
            //get only values
            const criteria = {
                age: values.age_range.map(a => a.value),
                type: values.study_buddy_types.map(a => a.value),
                timezone: values.time_zone.map(a => a.value),
                native_lang: values.native_language.map(a => a.value),
                learning_lang: values.learning_language.map(a => a.value),
                gender: values.gender.map(a => a.value),
                language_level: values.language_level.map(a => a.value),
                page: 1,
                word: values.searchWord

            }
            //count how many filters are on
            let numFilters = 0
            numFilters += criteria.age.length > 0 ? 1 : 0
            numFilters += criteria.type.length > 0 ? 1 : 0
            numFilters += criteria.timezone.length > 0 ? 1 : 0
            numFilters += criteria.native_lang.length > 0 ? 1 : 0
            numFilters += criteria.learning_lang.length > 0 ? 1 : 0
            numFilters += criteria.gender.length > 0 ? 1 : 0
            numFilters += criteria.language_level.length > 0 ? 1 : 0

            setNumFilters(numFilters)
            setDoneGettingData(false);
            const res = await StudyBuddyApi.getFilteredStudyBuddies(criteria)

            setData(res);
            setDoneGettingData(true);


        } catch (e) {
            if (e instanceof TypeError) {
                //means server is down
                console.error('TypeError getting study buddy data', e)
                setErrors(["UNKNOWN"])
            } else {
                console.error('Error getting study buddy data', e)
                setErrors(e)
            }
        } finally {
            setSubmitting(false)
        }
    }

    const removeFilters = (formik) => {
        formik.resetForm({
            values: {
                ...initialValues
            }
        })

        setNumFilters(0)
    }

    const closeDialogSearch = (formik) => {
        setIsDialogOpen(false)
        formik.submitForm()
        setIsDialogOpen(false)
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {formik => {

                    return (
                        <div data-testid="studyBuddyPage" className="StudyBuddies">
                            <Form>
                                <Dialog open={isDialogOpen} onClose={() => closeDialogSearch(formik)} className="relative z-50">
                                    <div className="fixed inset-0 bg-gray/75" aria-hidden="true" />
                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full max-w-full p-4 justify-center">
                                            <Dialog.Panel className="grow max-w-[500px] w-full h-full rounded shadow-xl bg-white p-4">
                                                <div className="flex justify-end p-4">
                                                    <X classes='cursor-pointer'
                                                        onClick={() => closeDialogSearch(formik)} />
                                                </div>
                                                <Dialog.Title className='font-medium text-center text-mobile-page-header pt-4 mb-5'>
                                                    {pageText.FILTER_SB}
                                                </Dialog.Title>
                                                <div className="flex justify-end mb-6 md:mb-4 items-center hover:text-gray-text "
                                                    onClick={() => removeFilters(formik)}>
                                                    <span ><AwesomeFilterX /></span>
                                                    <span className="ps-2 cursor-pointer underline underline-offset-2">{pageText.REMOVE_FILTERS}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="mb-4">
                                                        <FormikControl
                                                            control='listbox'
                                                            label={pageText.FILTER_TYPE}
                                                            select={pageText.SELECT}
                                                            name='study_buddy_types'
                                                            data={formik.values.study_buddy_types}
                                                            options={studyBuddyTypeOptions} />

                                                    </div>
                                                    <div className="mb-4">
                                                        <FormikControl
                                                            control='listbox'
                                                            label={pageText.FILTER_NATIVE_LANG}
                                                            select={pageText.SELECT}
                                                            name='native_language'
                                                            data={formik.values.native_language}
                                                            options={languageOptions} />
                                                    </div>
                                                    <div className="mb-4">
                                                        <FormikControl
                                                            control='listbox'
                                                            label={pageText.FILTER_LEARN_LANG}
                                                            select={pageText.SELECT}
                                                            name='learning_language'
                                                            data={formik.values.learning_language}
                                                            options={languageOptions} />
                                                    </div>
                                                    <div className="mb-4">
                                                        <FormikControl
                                                            control='listbox'
                                                            label={pageText.FILTER_LANG_LEVEL}
                                                            name='language_level'
                                                            select={pageText.SELECT}
                                                            data={formik.values.language_level}
                                                            options={englishLevelOptions} />
                                                    </div>

                                                    <div className="mb-4">
                                                        <FormikControl
                                                            control='listbox'
                                                            label={pageText.TIME_ZONE}
                                                            name='time_zone'
                                                            select={pageText.SELECT}
                                                            data={formik.values.time_zone}
                                                            options={timezoneOptions} />
                                                    </div>
                                                    <div className="mb-4">
                                                        <FormikControl
                                                            control='listbox'
                                                            label={pageText.FILTER_AGE_RANGE}
                                                            name='age_range'
                                                            select={pageText.SELECT}
                                                            data={formik.values.age_range}
                                                            options={ageOptions} />
                                                    </div>
                                                    <div className="mb-4">
                                                        <FormikControl
                                                            control='listbox'
                                                            label={pageText.FILTER_GENDER}
                                                            name='gender'
                                                            select={pageText.SELECT}
                                                            data={formik.values.gender}
                                                            options={genderOptions} />
                                                    </div>

                                                    <div className="mb-24 mt-12 flex">
                                                        <Button lang={lang} type="button" btnText={pageText.APPLY_FILTERS} extraClasses="grow bg-study-buddy-accent " textColor="text-primary-dark" clickMethod={formik.submitForm} />
                                                    </div>
                                                </div>

                                            </Dialog.Panel>
                                        </div >
                                    </div>


                                </Dialog >
                                <div data-testid="pageTitlepageText" className={``}>
                                    <PageTitle text={pageText.TITLE}
                                        extraClasses={`${lang === "EN" ? 'font-StudyBuddyEN' : 'font-StudyBuddyJA'}
                    my-3`} />

                                    {errors.length > 0 && <div><ServerError msg={errors} /></div>}

                                    {data.length === 0 && errors.length === 0 && doneGettingData === false ?
                                        <div className=' my-24'>
                                            <Spinner />
                                        </div>
                                        : errors.length === 0 && data.length > 0 && doneGettingData === true ?
                                            <>
                                                <div className="w-full px-4 mb-3" data-testid="studyBuddiespageText">
                                                    <SearchBar
                                                        placeholder={pageText.SEARCH_PLACEHOLDER}
                                                        btn={
                                                            <Button btnText={numFilters > 0 ? `${numFilters} ${pageText.HAS_FILTER}` : <><AwesomeFilter /> {pageText.FILTER}</>}
                                                                icon={numFilters > 0 ? <Filter /> : ""}
                                                                bkColor='bg-study-buddy-accent'
                                                                textColor='text-primary-dark'
                                                                px='px-8'
                                                                lang={lang}
                                                                clickMethod={() => setIsDialogOpen(true)} />
                                                        }
                                                        name='searchWord'
                                                        onSubmit={onSubmit}
                                                    />
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
                                            </> :
                                            doneGettingData === true && data.length === 0 ?
                                                <>

                                                    <div className="w-full px-4 mb-3">
                                                        <SearchBar
                                                            placeholder={pageText.SEARCH_PLACEHOLDER}
                                                            btn={
                                                                <Button btnText={numFilters > 0 ? `${numFilters} ${pageText.HAS_FILTER}` : pageText.FILTER}
                                                                    icon={numFilters > 0 ? <Filter /> : ""}
                                                                    bkColor='bg-study-buddy-accent'
                                                                    textColor='text-primary-dark'
                                                                    px='px-8'
                                                                    lang={lang}
                                                                    clickMethod={() => setIsDialogOpen(true)} />
                                                            }
                                                            name='searchWord'
                                                            onSubmit={onSubmit}
                                                        />
                                                    </div>

                                                    <div data-testid="studyBuddiesNoData" className='my-12'>
                                                        < NoData msg={pageText.NO_USERS_MSG} />
                                                    </div>
                                                </>


                                                : ''}
                                </div >
                            </Form >
                        </div>
                    )
                }}

            </Formik >
        </>
    )
}

export default StudyBuddies