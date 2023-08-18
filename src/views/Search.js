import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/common/SearchBar'
import useFormData from '../hooks/useFormData'
import { useLocation } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import usePageText from '../hooks/usePageText'
import Card from "../components/studyBuddy/Card"
import { v4 as uuid } from "uuid"
import useNavigateToProfile from '../hooks/useNavigateToProfile'
import ServerError from '../components/form/ServerError'
import Spinner from '../components/common/Spinner'
import UserApi from '../api/user'
import UsersResultsRight from '../components/form/search/UsersResultsRight'
import UsersResultsTopRight from '../components/form/search/UsersResultsTopRight'
import { Formik, Form } from 'formik'

function Search() {
    const location = useLocation()
    // const [data, setData, handleChange, resetData] = useFormData({ word: location.state.word })
    const formRef = useRef()
    const [pageText, lang] = usePageText('searchBar')
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const tabs = [pageText.USERS, pageText.INFO_CENTER, pageText.LANGUAGE_TOWN, pageText.MARKETPLACE]
    const goToProFile = useNavigateToProfile()
    const [doneGettingData, setDoneGettingData] = useState(true)
    const [results, setResults] = useState(null)
    const [errors, setErrors] = useState([])

    const initialValues = { word: '' }
    let formValues = {}
    if (location.state && location.state.from === '/') {
        formValues = { word: location.state.word }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state && location.state.from === '/') {
            formRef.current.handleSubmit();
        }
    }, [])


    const submitSearch = async (values, { setSubmitting }) => {

        if (values.word === '') {

            setDoneGettingData(true)
            setResults(null)
            setErrors([])
        } else {
            setDoneGettingData(false)
            setErrors([])
            try {
                const res = await UserApi.findUsers({ word: values.word })

                setResults(res)
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
                setDoneGettingData(true)
            }


        }
    }
    const handleKeyDown = (e, formik) => {

        if (e.key === 'Enter') {

            submitSearch(formik.values, formik)
        }
    }

    return (
        <div className='Search'>
            <div className="bg-primary-dark py-6 px-4">
                <Formik
                    initialValues={formValues || initialValues}
                    onSubmit={submitSearch}
                    innerRef={formRef}
                    enableReinitialize

                >{formik => {

                    return (
                        <Form data-testid="searchForm" onKeyDown={(e) => handleKeyDown(e, formik)}>
                            <SearchBar
                                placeholder={pageText.PLACEHOLDER}
                                name='word'
                                data={formik.values.word}
                                onSubmit={submitSearch}
                            />
                        </Form>
                    )
                }}
                </Formik>
            </div>
            {errors.length > 0 && <ServerError msg={errors} />}
            {!results && errors.length === 0 && doneGettingData === false ?
                <div className=' my-24'>
                    <Spinner />
                </div>
                :
                results === null && errors.length === 0 && doneGettingData === true ?


                    <div className='my-24 max-w-prose mx-auto w-full'>
                        <p className='text-center mb-8'>
                            {pageText.MSG_1}
                        </p>
                        <p className='text-center mb-8'> {pageText.MSG_2}</p>
                        <p className='text-center'> {pageText.MSG_3}</p>
                    </div>

                    : results.length === 0 && errors.length === 0 && doneGettingData === true ?
                        <div className='my-24 max-w-prose mx-auto w-full'>
                            <p className='text-center mb-8'>
                                {pageText.NO_INFO}
                            </p>
                            <p className='text-center mb-8'>{pageText.NO_INFO2}</p>

                        </div>
                        :
                        <div className='w-full mt-6'>
                            <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
                                <Tab.List className="flex justify-between flex-col md:flex-row">
                                    <Tab className="w-full pb-1 md:pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:text-primary-dark
                                        ui-selected:font-bold
                                        ui-selected:outline-none">
                                        {tabs[0]}
                                    </Tab>

                                    <Tab className="w-full py-2 md:pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:font-bold
                                        ui-selected:text-primary-dark
                                        ui-selected:outline-none">
                                        {tabs[1]}
                                    </Tab>
                                    <Tab className="w-full py-2 md:pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:font-bold
                                        ui-selected:text-primary-dark
                                        ui-selected:outline-none">
                                        {tabs[2]}
                                    </Tab>
                                    <Tab className="w-full py-2 md:pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:font-bold
                                        ui-selected:text-primary-dark
                                        ui-selected:outline-none">
                                        {tabs[3]}
                                    </Tab>

                                </Tab.List>
                                <div className='my-6'>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <div className=' mx-auto'>
                                                <div data-testid="results" className='mt-4 flex  flex-wrap justify-center mb-12 gap-4 px-2'>
                                                    {results.map(d =>
                                                        <Card data={d}
                                                            goToProfileOnClick={goToProFile}
                                                            key={uuid()}
                                                            buddy={false}
                                                            topRightStatic={true}
                                                            topRight={<UsersResultsTopRight data={d} />}
                                                            underUsername={<UsersResultsRight data={d} />}
                                                        />)}

                                                </div>
                                            </div>


                                        </Tab.Panel>

                                        <Tab.Panel>
                                            <div className='my-24 max-w-prose mx-auto w-full'>
                                                <p className='text-center mb-8'>
                                                    {pageText.INFO_CENTER1}
                                                </p>
                                                <p className='text-center mb-8'>{pageText.INFO_CENTER2}</p>
                                                <p className='text-center'>{pageText.CHECK_BACK}</p>
                                            </div>

                                        </Tab.Panel>
                                        <Tab.Panel>

                                            <div className='my-24 max-w-prose mx-auto w-full'>
                                                <p className='text-center mb-8'>
                                                    {pageText.TOWN1}
                                                </p>
                                                <p className='text-center mb-8 max-w-prose'>{pageText.TOWN2}</p>
                                                <p className='text-center'>{pageText.CHECK_BACK}</p>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className='my-24 max-w-prose mx-auto w-full'>
                                                <p className='text-center mb-8 '>
                                                    {pageText.MARKET1}
                                                </p>
                                                <p className='text-center mb-8 '>{pageText.MARKET2}</p>
                                                <p className='text-center'>{pageText.CHECK_BACK}</p>
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </div>
                            </Tab.Group>
                        </div>}
        </div>
    )
}

export default Search