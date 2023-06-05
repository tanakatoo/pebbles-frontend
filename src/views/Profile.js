import React from 'react'
import UserApi from '../api/user'

const Profile = async () => {
    const res = await UserApi.getUserInfo()
    console.log(res)
    return (
        <></>
    )
}

export default Profile