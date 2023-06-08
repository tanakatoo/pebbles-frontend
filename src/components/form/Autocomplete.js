import { Combobox } from '@headlessui/react';
import { useEffect, useState, Fragment } from 'react';
import ExternalApi from '../../api/external';
import { useField } from 'formik';

const Autocomplete = ({ onSelect, ...props }) => {

    const handleSelect = (selectedItem) => {
        onSelect(selectedItem);
    };

    const [field, meta, helpers] = useField(props.name);
    console.log(field, helpers)

    const [selected, setSelected] = useState()
    const [query, setQuery] = useState()
    const [listOfLocations, setListOfLocations] = useState([])

    const getLocations = async (q = '') => {
        setQuery(q)
        const res = await ExternalApi.autocompleteLocation('Paris', "EN")

        setListOfLocations(res)
    }

    const setTheSelected = (e) => {
        console.log(e.description)
        setSelected(e.description)
        console.log('field value is', field.value)
        console.log(helpers)
        helpers.setValue(e.place_id)
    }

    // useEffect(() => {
    //     //whenever selected is chosen, pass the id to the form
    //     handleSelect(selected)
    // }, [selected])

    // const [query, setQuery] = useState('')

    // const filteredPeople =
    //     query === ''
    //         ? people
    //         : people.filter((person) => {
    //             return person.toLowerCase().includes(query.toLowerCase())
    //         })

    return (
        <Combobox as='div' {...field} by="place_id" onChange={setTheSelected} >
            <Combobox.Input onChange={(event) => getLocations(event.target.value)} value={selected} />
            <Combobox.Options>
                {listOfLocations.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                    </div>)
                    :
                    (
                        listOfLocations.map((l) => (
                            <Combobox.Option key={l.place_id} value={l} id={l.place_id}>
                                {l.description}
                            </Combobox.Option>
                        ))
                    )}
            </Combobox.Options>
        </Combobox>
    )
};

export default Autocomplete