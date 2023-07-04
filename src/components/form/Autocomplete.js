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
    const [sessionToken, setSessionToken] = useState('')

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
            } catch (e) {
                setErrors(e)
            }

        } else if (q.length === 0) {
            //user cleared locations so clear location
            setListOfLocations([])
        }

    }

    const handleKeyDown = (e) => {
        console.log(e.key)
        if (e.key === 'backspace') {
            //user pressed backspce, so if the data is less than
        }
    }


    const handleSelection = async (val, setFieldValue) => {
        //sets the value of the place id and description

        setFieldValue(name, val)
        //now need to get the long namesof the selected place using the same sessiontoken 

        const res = await ExternalApi.autocompleteSelectLocation(val.place_id, sessionToken)


        setFieldValue("country_en", res.EN.country)
        setFieldValue("state_en", res.EN.state)
        setFieldValue("city_en", res.EN.city)
        setFieldValue("country_ja", res.JA.country)
        setFieldValue("state_ja", res.JA.state)
        setFieldValue("city_ja", res.JA.city)

        setSessionToken(undefined)
        //reset the session token as we can't use it anymore for the next call because we used it to call already
    }

    return (
        <div className=' flex flex-col w-full'>
            <label className={`mb-2  text-mobile-section-header font-medium`} htmlFor={name}>Location</label>
            <Field name={name} {...props}>
                {
                    ({ field, form }) => {

                        const { setFieldValue } = form
                        const { value } = field

                        return (

                            < Combobox value={value.description}
                                as='div' {...field}
                                onChange={val => handleSelection(val, setFieldValue)}
                                className='flex flex-col'
                            >
                                <Combobox.Input
                                    displayValue={(val) => val.description}
                                    onChange={(event) => handleChange(event.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className={`grow rounded-ml py-3 px-4 text-black placeholder-gray `} />
                                <Combobox.Options className=" w-max cursor-pointer">
                                    {listOfLocations.length === 0 && (query && query.length > 3) ? (
                                        <div className="cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>)
                                        : listOfLocations.length > 0 ?
                                            (<div >
                                                {listOfLocations.map((l) => (
                                                    <Combobox.Option key={l.place_id} value={l} id={l.place_id}
                                                        className='py-1 px-4 ui-active:bg-accent-very-light rounded-ml'>
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
            {errors.length > 0 ? <ServerError value={errors} /> : null}

        </div >
    )
};

export default Autocomplete