import React, { useEffect, useState } from 'react'
import { FieldArray, ErrorMessage, useField } from 'formik'
import TextError from "./errorComponents/TextError"
import { useSelector } from 'react-redux'
import { Listbox, Transition } from '@headlessui/react'
import { AwesomeCheck } from '../../styles/Icons'
import { Field } from 'formik'

//each component needs a label, <Field>, and <ErrorMessage>

//example props
//control="input"
//label="Email"
//name="email"
//type="email" or text or password

const DropdownMultiple = ({ name, label, options, data, select }) => {
    const lang = useSelector(state => state.langFont.lang)
    const [isOpen, setIsOpen] = useState(false)
    console.log('data coming in is', name, data)
    const [selectedItem, setSelectedItem] = useState(data)

    const handleSelectedLevel = (setFieldValue, val) => {

        setSelectedItem(val);
        setFieldValue(name, val)
        setIsOpen(true);
    }
    useEffect(() => {
        if (data.length === 0) {
            setSelectedItem([])
        }
    }, [data])


    return (
        <Field name={name} component={({ field, form }) =>

            < Listbox as='div'
                by='value'
                value={selectedItem}
                onChange={(val) => handleSelectedLevel(form.setFieldValue, val)}
                multiple
                className={`${lang === "EN" ? 'font-poppins' : 'font-NotoSansJPRegular'}`}
            >
                {() => (
                    <>

                        <Listbox.Label className={`font-medium`}>{label}</Listbox.Label>
                        <div className="relative mt-2">
                            <Listbox.Button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`${isOpen ?
                                    'border-t border-l border-r rounded-t-ml border-b border-b-gray'
                                    : 'border rounded-ml'} 
                                    border-gray w-full p-2 pe-6 text-left bg-white`}
                            >
                                {selectedItem.length < 1 ? <span className="text-gray">{select}</span> :
                                    <span className="block truncate">
                                        {selectedItem.map((i, idx) => idx === selectedItem.length - 1 ? i.key : i.key + ", ")}
                                    </span>}

                                <span className="absolute inset-y-0 right-0 flex items-center pe-2 pointer-events-none">
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
                            <div className="">
                                <Transition
                                    show={isOpen}
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    className="absolute w-full p-2 pe-4 z-10"
                                >
                                    <Listbox.Options
                                        static
                                        className='absolute pt-2 max-h-60 w-full overflow-auto rounded-b-ml bg-white py-1 border-l border-gray border-r border-b shadow-lg focus:outline-none '>
                                        {options.map((person) => (
                                            <Listbox.Option key={person.value}
                                                value={person}
                                                className={({ active }) =>
                                                    `relative select-none cursor-pointer ps-5 pb-2 `
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        {person.key}

                                                        {selected ? (
                                                            <span className="text-success absolute inset-y-0 left-0 flex items-center pb-2 text-amber-600">
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
            </Listbox >

        } />
    )
}

export default DropdownMultiple


