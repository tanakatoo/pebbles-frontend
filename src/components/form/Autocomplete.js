import React, { useEffect, useState } from "react"
import { Combobox } from '@headlessui/react';
import ExternalApi from '../../api/external';
import { Field } from 'formik';
import ServerError from './ServerError';
import { v4 as uuid } from "uuid"

const Autocomplete = ({ name, onSelect, ...props }) => {
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
            res = await ExternalApi.autocompleteLocation(q, "EN", newSessionToken)

        } else {
            //use the current sessionToken
            res = await ExternalApi.autocompleteLocation(q, "EN", sessionToken)
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
        <div className='form-control'>
            <label htmlFor={name}>Location</label>
            <Field name={name} {...props}>
                {
                    ({ field, form }) => {

                        const { setFieldValue } = form
                        const { value } = field

                        return (
                            <div>
                                < Combobox value={value.description} as='div' {...field} onChange={val => handleSelection(val, setFieldValue)} >
                                    <Combobox.Input displayValue={(val) => val.description} onChange={(event) => handleChange(event.target.value)} onKeyDown={handleKeyDown} />
                                    <Combobox.Options>
                                        {listOfLocations.length === 0 && (query && query.length > 3) ? (
                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                Nothing found.
                                            </div>)
                                            : listOfLocations.length > 0 ?
                                                (
                                                    listOfLocations.map((l) => (
                                                        <Combobox.Option key={l.place_id} value={l} id={l.place_id}>
                                                            {l.description}
                                                        </Combobox.Option>
                                                    ))
                                                )
                                                : null
                                        }
                                    </Combobox.Options>
                                </Combobox>

                            </div>
                        )
                    }
                }
            </Field>
            {errors.length > 0 ? <ServerError value={errors} /> : null}

        </div >
    )
};

export default Autocomplete