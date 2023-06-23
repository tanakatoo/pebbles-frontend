import React, { useEffect, useState } from 'react'
import Card from "../components/message/Card"
import MessageApi from '../api/message'
import ServerError from '../components/form/ServerError'
import Spinner from '../components/common/Spinner'
import { v4 as uuid } from "uuid"
import useSetToken from '../hooks/useSetToken'
import SearchBar from '../components/common/SearchBar'
import Dropdown from '../components/common/Dropdown'
import useClickOutside from '../hooks/useClickOutside'
import usePageText from "../hooks/usePageText"
import Protected from '../components/common/Protected'
import NoData from '../components/common/NoData'
import { Link } from 'react-router-dom'

function MessageMain() {
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const [dropdown, setDropdown] = useState(false)
    const pageText = usePageText("messages")

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await MessageApi.getAllUsersLatestMsg()
                setData(res)
            } catch (e) {
                if (e instanceof TypeError) {

                    //means server is down
                    setErrors(["UNKNOWN"])
                } else {

                    setErrors(e)
                }
            }
        }
        getData()
    }, [])

    const handleSearch = () => {
        //to be implemented later
        console.log('call to search for contact')
    }

    const handleDropdown = () => {
        dropdown ? setDropdown(false) : setDropdown(true)
    }

    const closeDropdown = () => {
        setDropdown(false)
    }
    const ref = useClickOutside(closeDropdown)

    const dropdownItems =
        [
            { text: pageText.BLOCK_CONTACTS, link: '/users/block' },
            { text: pageText.UNBLOCK_CONTACTS, link: '/users/unblock' }
        ]

    return (
        <Protected>
            <div className=' my-16 flex justify-center'>

                {errors.length > 0 && <ServerError msg={errors} />}
                {!data && errors.length === 0 ?
                    <Spinner />
                    : data.length === 0 ?
                        <div className='flex flex-col items-center'>
                            <NoData msg={pageText.NO_MSG} link="/users/dashboard" linkText={pageText.BACK_TO_DASHBOARD} />
                            <div className='text-link'><Link to="/users/unblock">{pageText.UNBLOCK_CONTACTS}</Link></div>
                        </div>
                        :
                        errors.length === 0 ?
                            <div className='container grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12  lg:mx-24 xl:mx-48'>
                                {/* <div className='col-span-full mb-4 mt-2'><SearchBar handleSearch={handleSearch} /></div> */}
                                <div className="flex col-span-full justify-end relative">
                                    <span className='cursor-pointer' ref={ref} onClick={handleDropdown}>
                                        {pageText.EDIT}
                                    </span>
                                    {dropdown && <Dropdown items={dropdownItems}
                                        divide={true}
                                        css="rounded shadow-dropdown top-8" />}
                                </div>
                                <div className='col-span-full'>
                                    {data.map(d => <Card data={d} key={uuid()} screen='main' />)}

                                </div>
                            </div>
                            : ''
                }

            </div>
        </Protected>
    )
}

export default MessageMain