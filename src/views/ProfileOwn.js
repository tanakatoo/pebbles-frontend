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
    const profile = useSelector(state => state.profile.profile)



    return (
        <div>
            {!!profile && <div>
                {errors.length > 0 && <ServerError msg={errors} />}
                {profile.gender && < p > Gender is: {dbText.genders[profile.gender][lang]}</p >}

                {profile ? Object.keys(profile).map(m => <p>{m} : {profile[m]}</p>) : ''}
                < Link to='/users/hello' > hello profile</Link >
                <Link to="/users/profile/edit">edit logged in profile</Link>
            </div>
            }
        </div >
    )
}

export default ProfileOwn