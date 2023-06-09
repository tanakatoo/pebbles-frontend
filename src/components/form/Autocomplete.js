import { Combobox } from '@headlessui/react';
import { useEffect, useState, Fragment } from 'react';
import ExternalApi from '../../api/external';
import { Field } from 'formik';
import ServerError from './ServerError';

const Autocomplete = ({ name, name_hidden, onSelect, ...props }) => {
    const [query, setQuery] = useState('')
    const [listOfLocations, setListOfLocations] = useState([])
    const [errors, setErrors] = useState([])
    const [getNewData, setGetNewData] = useState(false)

    const getLocationsFromAPI = async (q) => {
        const res = await ExternalApi.autocompleteLocation(q, "EN")
        console.log(res)
        return res
    }

    const handleChange = async (q = '') => {
        setQuery(q)

        if (q.length > 2 || (q.length > 2 && q.length < query.length)) {
            //get data from api
            try {
                const res = await getLocationsFromAPI(q)
                setListOfLocations(res)
            } catch (e) {
                setErrors(e)
            }

        } else if (q.length === 0) {
            //user cleared locations so clear location
            setListOfLocations([])
        } else if (listOfLocations.length > 0) {
            console.log('getting from our store!')
            //get from saved list if not empty
            setListOfLocations(() => {
                listOfLocations.map(l => {
                    if (l.description.includes(q)) {
                        return l
                    }
                })
            })
        }

    }

    const handleKeyDown = (e) => {
        console.log(e.key)
        if (e.key === 'backspace') {
            //user pressed backspce, so if the data is less than 
        }
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
                                < Combobox value={value.description} as='div' {...field} onChange={val => setFieldValue(name, val)} >
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