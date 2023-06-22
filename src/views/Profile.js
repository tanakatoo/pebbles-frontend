import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import usePageText from '../hooks/usePageText'
import ProfileTabProfile from '../components/common/ProfileTabProfile not used'
import dbText from "../text/db.json"
import Spinner from '../components/common/Spinner'
import NoData from '../components/common/NoData'
import useSetToken from '../hooks/useSetToken'
import Avatar from '../components/common/Avatar'
import { Button } from "../components/button/Button"
import { current } from '@reduxjs/toolkit'


/**this is used to display profiles of other users not the logged in user, 
 * so we do not need to set a token for this route
 *  if the logged in user goes here to look at their profile, it would display the public profile
 * */

const Profile = () => {
    const { username } = useParams()
    const pageText = usePageText("profile")
    const lang = useSelector(state => state.langFont.lang)
    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const [currentProfile, setCurrrentProfile] = useState(null)
    const [doneGettingData, setDoneGettingData] = useState(false)
    const tabs = ['Profile', 'Habits', 'Study Buddy']

    //get the user public profile
    let res
    useEffect(() => {

        const getUser = async () => {
            try {
                setDoneGettingData(false)
                res = await UserApi.getUserInfo(username)
                console.log(res)
                setCurrrentProfile(res)
                setDoneGettingData(true)

            } catch (e) {
                if (e instanceof TypeError) {
                    //means server is down
                    setErrors(["UNKNOWN"])
                } else {
                    setErrors(e)
                }
            }
        }
        getUser()

    }, [username])


    return (
        <div className='container mx-auto mt-2'>
            {errors.length > 0 && <ServerError msg={errors} />}
            {!currentProfile && errors.length === 0 && doneGettingData === false ?
                <div className=' my-24'>
                    <Spinner />
                </div>
                : doneGettingData === true && !currentProfile ?
                    <NoData msg='Profile not available' link='/messages' linkText='Back to contact list' />
                    :
                    errors.length === 0 ?
                        <>
                            <div className='grid grid-cols-4 grid-row-1 m-2'>
                                <div className='col-span-2 flex'>
                                    <div className='flex flex-col items-center gap-2'>
                                        <Avatar src={`../avatars/${currentProfile.avatar}`} size='profile' />

                                        <p>{currentProfile.username}</p>
                                        <p className='text-link text-mobile-label-2'>Edit</p>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <p>what to put here for public?</p>
                                </div>
                            </div>
                            <div className='w-full mt-6'>
                                <Tab.Group defaultIndex={1}>
                                    <Tab.List className="flex justify-between">
                                        <Tab className="w-full pb-3 border-b-2 ui-not-selected:border-b-gray-stroke text-gray-text ui-selected:text-black">{tabs[0]}</Tab>
                                        <Tab className="w-full pb-3 border-b-2 ui-not-selected:border-b-gray-stroke text-gray-text ui-selected:text-black">{tabs[2]}</Tab>
                                    </Tab.List>
                                    <div className='my-6'>
                                        <Tab.Panels>
                                            <Tab.Panel >
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>About</p>
                                                <p className='mt-2'>{currentProfile.about}</p>
                                                <p className='mt-6 text-mobile-section-header font-PoppinsMedium'>Location</p>
                                                <p className='mt-2'>{currentProfile.city ? currentProfile.city + ',' : ''}
                                                    {currentProfile.state ? currentProfile.state + ',' : ''}
                                                    {currentProfile.country ? currentProfile.country : ''}</p>
                                            </Tab.Panel>

                                            <Tab.Panel>
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                    My purpose for using study buddy
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_purpose}</p>
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                    About me and how I want to study with you
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_bio}</p>
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                    Buddy type
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_types.map(t => `${t}, `)}</p>
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                    English level
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_language_level}</p>
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                    Buddy type
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_purpose}</p>
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                    Buddy type
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_purpose}</p>
                                                <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                    Buddy type
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_purpose}</p>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </div>
                                </Tab.Group>
                            </div>
                        </>



                        : ''
            }
        </div >
    )
}

export default Profile