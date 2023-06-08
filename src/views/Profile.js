import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dbText from "../text/db.json"
import usePageText from '../hooks/usePageText'


/**this is used to display profiles of other users not the logged in user, 
 * so we do not need to set a token for this route
 *  if the logged in user goes here to look at their profile, it would display the public profile
 * */

const Profile = () => {
    const { username } = useParams()
    const [pageText] = usePageText("profile")
    const lang = useSelector(state => state.langFont.lang)
    console.log(lang)
    const [errors, setErrors] = useState([])
    // const profile = useSelector(state => state.profile)
    const [currentProfile, setCurrrentProfile] = useState()
    console.log('curent profile is now', currentProfile)
    let res
    useEffect(() => {
        const getUser = async () => {
            try {
                res = await UserApi.getUserInfo(username)
                // dispatch(actionSaveProfile(res))
                setCurrrentProfile(res)

            } catch (e) {
                console.log('got error', e)
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
                {pageText.USERNAME}: {currentProfile.username}
                {currentProfile.gender && < p > {pageText.GENDER}:  {dbText.genders[currentProfile.gender][lang]}</p >}
                <p>< Link to='/users/hello' >click to go to hello profile</Link ></p>
                <p><Link to="/users/profile">login as ktoo first and clicking this displays ktoo</Link></p></div>
            }
        </div >
    )
}

export default Profile