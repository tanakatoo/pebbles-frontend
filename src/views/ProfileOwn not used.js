import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useDispatch, useSelector } from 'react-redux'
import { actionSaveProfile } from '../reducers/actionCreator'
import { Link } from 'react-router-dom'
import useSetToken from '../hooks/useSetToken'
import dbText from "../text/db.json"
import Autocomplete from '../components/form/Autocomplete'
import Protected from '../components/common/Protected'
import Spinner from '../components/common/Spinner'
import NoData from '../components/common/NoData'
import Avatar from '../components/common/Avatar'
import { Tab } from "@headlessui/react"

/**this is used to display the logged in user's profile
 * When the user logs in, we get the profile and save it in redux so 
 * we are just pulling it up from redux here
 *  
 * */

const ProfileOwn = () => {
    // const { username } = useParams()
    const lang = useSelector(state => state.langFont.lang)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const username = useSelector(state => state.profile.profile.username)
    const [profile, setProfile] = useState(null)
    const [doneGettingData, setDoneGettingData] = useState(false)
    const tabs = ['Profile', 'Habits', 'Study Buddy']

    let location = ''
    let res
    useEffect(() => {

        const getUser = async () => {
            try {
                setDoneGettingData(false)
                res = await UserApi.getUserInfo(username)
                console.log(res)
                setProfile(res)
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

    }, [])

    useEffect(() => {
        if (profile) {

            if (lang === "EN") {
                location = profile.country_en ?
                    profile.country_en : ''
                location += profile.country_en && profile.state_en ?
                    ", " + profile.state_en :
                    profile.state_en ?
                        profile.state_en :
                        ""
                location += (profile.country_en || profile.state_en) && profile.city_en ?
                    ', ' + profile.city_en :
                    profile.city_en ?
                        profile.city_en :
                        ""
            }
            console.log(location, profile.country_en)
        }
    }, [lang])


    return (
        <Protected>
            <div className='container mx-auto mt-2'>
                {errors.length > 0 && <ServerError msg={errors} />}
                {!profile && errors.length === 0 && doneGettingData === false ?
                    <div className=' my-24'>
                        <Spinner />
                    </div>
                    : doneGettingData === true && !profile ?
                        <NoData msg='Profile not available' link='/messages' linkText='Back to contact list' />
                        :
                        errors.length === 0 ?
                            <>
                                <div className='grid grid-cols-4 grid-row-1 m-2'>
                                    <div className='col-span-2 flex'>
                                        <div className='flex flex-col items-center gap-2'>
                                            <Avatar src={`../avatars/${profile.avatar}`} size='profile' />

                                            <p>{profile.username}</p>
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
                                            <Tab className="w-full pb-3 border-b-2 ui-not-selected:border-b-gray-stroke text-gray-text ui-selected:text-black ui-selected:outline-none">{tabs[0]}</Tab>
                                            <Tab className="w-full pb-3 border-b-2 ui-not-selected:border-b-gray-stroke text-gray-text ui-selected:text-black ui-selected:outline-none">{tabs[1]}</Tab>
                                            <Tab className="w-full pb-3 border-b-2 ui-not-selected:border-b-gray-stroke text-gray-text ui-selected:text-black ui-selected:outline-none">{tabs[2]}</Tab>
                                        </Tab.List>
                                        <div className='my-6'>
                                            <Tab.Panels>
                                                <Tab.Panel >
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>About</p>

                                                    <p className='mt-2'>{profile.about}</p>
                                                    <p className='mt-6 text-mobile-section-header font-PoppinsMedium'>Location</p>
                                                    <p className='mt-2'>{location}
                                                    </p>
                                                </Tab.Panel>
                                                <Tab.Panel>
                                                    For goals
                                                </Tab.Panel>
                                                <Tab.Panel>
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                        My purpose for using study buddy
                                                    </p>
                                                    <p className='mt-2'>{profile.study_buddy_purpose}</p>
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                        About me and how I want to study with you
                                                    </p>
                                                    <p className='mt-2'>{profile.study_buddy_bio}</p>
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                        Buddy type
                                                    </p>
                                                    <p>testing</p>
                                                    <p className='mt-2'>{profile.study_buddy_types.map(
                                                        (t, idx) => idx === profile.study_buddy_types.length - 1 ?
                                                            dbText.study_buddy_types[t][lang] : dbText.study_buddy_types[t][lang] + ', '
                                                    )}</p>
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                        English level
                                                    </p>
                                                    <p className='mt-2'>{profile.language_level}</p>
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                        Time zone
                                                    </p>
                                                    <p className='mt-2'>{profile.time_zone}</p>
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                        Age Range
                                                    </p>
                                                    <p className='mt-2'>{profile.age_range}</p>
                                                    <p className='mb-2 text-mobile-section-header font-PoppinsMedium'>
                                                        Gender
                                                    </p>
                                                    <p className='mt-2'>{profile.gender}</p>
                                                </Tab.Panel>
                                            </Tab.Panels>
                                        </div>
                                    </Tab.Group>
                                </div>
                            </>



                            : ''
                }
            </div >
        </Protected>
    )
}

export default ProfileOwn