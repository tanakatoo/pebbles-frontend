import React, { useEffect, useState } from "react"
import { Combobox } from '@headlessui/react';
import ExternalApi from '../../api/external';
import { Field } from 'formik';
import ServerError from './ServerError';
import { v4 as uuid } from "uuid"
import { useSelector } from 'react-redux'

const Autocomplete = ({ name, onSelect, ...props }) => {
    const lang = useSelector(state => state.langFont.lang)
    const [query, setQuery] = useState('')
    const [listOfLocations, setListOfLocations] = useState([])
    const [errors, setErrors] = useState([])
    const [autoError, setAutoError] = useState([])
    const [sessionToken, setSessionToken] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const getLocationsFromAPI = async (q) => {
        let res
        if (!sessionToken) {
            //generate a new token to use now 
            const newSessionToken = uuid()
            setSessionToken(newSessionToken)

            res = await ExternalApi.autocompleteLocation(q, lang, newSessionToken)



        } else {
            //use the current sessionToken

            res = await ExternalApi.autocompleteLocation(q, lang, sessionToken)

        }

        return res
    }

    const handleChange = async (q = '') => {
        setQuery(q)

        //if the user types more than 2 characters OR they deleted some characters
        if (q.length > 2 || (q.length > 2 && q.length < query.length)) {
            //get data from api
            //check if sessionToken is ok, if it's empty generate one 

            try {

                const res = await getLocationsFromAPI(q)

                setListOfLocations(res)
                setIsOpen(true)
            } catch (e) {
                console.error('error gettting location', e)
                setErrors(e)
            }

        } else if (q.length === 0) {
            //user cleared locations so clear location
            setListOfLocations([])
            setIsOpen(false)

        } else if (listOfLocations.length === 0) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }

    }


    const handleSelection = async (val, setFieldValue) => {
        //sets the value of the place id and description

        setFieldValue(name, val)

        //now need to get the long namesof the selected place using the same sessiontoken 
        try {
            const res = await ExternalApi.autocompleteSelectLocation(val.place_id, sessionToken)
            setFieldValue("country_en", res.EN.country)
            setFieldValue("state_en", res.EN.state)
            setFieldValue("city_en", res.EN.city)
            setFieldValue("country_ja", res.JA.country)
            setFieldValue("state_ja", res.JA.state)
            setFieldValue("city_ja", res.JA.city)

            setSessionToken(undefined)
            //reset the session token as we can't use it anymore for the next call because we used it to call already
        } catch (e) {
            console.error('error setting location', e)
            setErrors(e)
        } finally {

            setIsOpen(false)
        }




    }

    return (
        <div className='Autocomplete flex flex-col w-full'>
            <label className={`mb-2  text-mobile-section-header font-medium`} htmlFor={name}>Location</label>
            {console.log('errors to send is', errors)}
            {errors.length > 0 ? <ServerError msg={errors} /> :
                <Field name={name} {...props}>
                    {
                        ({ field, form }) => {

                            const { setFieldValue } = form
                            const { value } = field

                            return (

                                < Combobox value={value.description}
                                    as='div' {...field}
                                    data-testid="autocompleteCombo"
                                    onChange={val => handleSelection(val, setFieldValue)}
                                    className='flex flex-col '
                                >
                                    <Combobox.Input
                                        displayValue={(val) => val.description}
                                        onChange={(event) => handleChange(event.target.value)}
                                        data-testid='autocompleteInput'
                                        className={`grow focus:outline-none focus:ring-0 ${isOpen ? 'rounded-t-ml rounded-r-ml' : 'rounded-ml'} py-3 px-4 text-black placeholder-gray`} />
                                    <Combobox.Options className={`${isOpen ? 'border-b border-l border-r' : ''}  w-max cursor-pointer`}>
                                        {listOfLocations.length === 0 && (query && query.length >= 3 && isOpen) ? (
                                            <div data-testid="autocompleteDropdown" className="cursor-default select-none py-2 px-4 text-gray-700">

                                                Nothing found.
                                            </div>)
                                            : listOfLocations.length > 0 ?
                                                (<div >

                                                    {listOfLocations.map((l) => (
                                                        <Combobox.Option key={l.place_id} value={l} id={l.place_id} data-testid="autocompleteDropdown"
                                                            className='py-1 px-4 ui-active:bg-gray-background'>
                                                            {l.description}
                                                        </Combobox.Option>
                                                    ))}
                                                </div>
                                                )
                                                : null
                                        }
                                    </Combobox.Options>
                                </Combobox>


                            )
                        }
                    }
                </Field>
            }

        </div >
    )
};

export default Autocomplete