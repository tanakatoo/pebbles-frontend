import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import usePageText from '../hooks/usePageText'
import ProfileTabProfile from '../components/common/ProfileTabProfile'
import dbText from "../text/db.json"


/**this is used to display profiles of other users not the logged in user, 
 * so we do not need to set a token for this route
 *  if the logged in user goes here to look at their profile, it would display the public profile
 * */

const Profile = () => {
    const { username } = useParams()
    const pageText = usePageText("profile")
    const lang = useSelector(state => state.langFont.lang)
    const [errors, setErrors] = useState([])
    const [currentProfile, setCurrrentProfile] = useState()
    const tabs = ['Profile', 'Habits', 'Study Buddy']

    //get the user public profile
    let res
    useEffect(() => {
        const getUser = async () => {
            try {
                res = await UserApi.getUserInfo(username)
                setCurrrentProfile(res)
            } catch (e) {
                setErrors(e)
            }
        }
        getUser()

    }, [username])


    return (
        <div>
            <h1>{pageText.H1}</h1>
            {!!currentProfile && <div>
                {errors.length > 0 && <ServerError msg={errors} />}
                <Tab.Group>
                    <Tab.List>
                        <Tab>{tabs[0]}</Tab>
                        <Tab>{tabs[1]}</Tab>
                        <Tab>{tabs[2]}</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            {pageText.USERNAME}: {currentProfile.username}
                            {currentProfile.gender && < p > {pageText.GENDER}:  {dbText.genders[currentProfile.gender][lang]}</p >}
                            <p>< Link to='/users/hello' >click to go to hello profile</Link ></p>
                            <p><Link to="/users/profile">login as ktoo first and clicking this displays ktoo</Link></p>
                        </Tab.Panel>
                        <Tab.Panel>Content 2</Tab.Panel>
                        <Tab.Panel>Content 3</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>


            }
        </div >
    )
}

export default Profile