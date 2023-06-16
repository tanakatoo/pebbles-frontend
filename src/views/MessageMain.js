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

function MessageMain() {
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])
    const [token] = useSetToken()
    const [dropdown, setDropdown] = useState(false)


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await MessageApi.getAllUsersLatestMsg()
                setData(res)
            } catch (e) {
                if (e instanceof TypeError) {
                    //mean server is down
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

    const dropdownItems = ["Block contacts", "Unblock contacts"]

    return (<div>
        {errors.length > 0 && <ServerError msg={errors} />}
        {!data && errors.length == 0 ?
            <Spinner />
            : errors.length == 0 ?
                <div className='container grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12'>
                    {/* <div className='col-span-full mb-4 mt-2'><SearchBar handleSearch={handleSearch} /></div> */}
                    <div className="flex col-span-full justify-end relative">
                        <span className='cursor-pointer' ref={ref} onClick={handleDropdown}>Edit</span>
                        {dropdown && <Dropdown items={dropdownItems}
                            divide={true}
                            css="rounded shadow-dropdown top-8" />}
                    </div>
                    <div className='col-span-full'>
                        {data.map(d => <Card data={d} key={uuid()} />)}

                    </div>
                </div>
                : ''
        }

    </div>)
}

export default MessageMain