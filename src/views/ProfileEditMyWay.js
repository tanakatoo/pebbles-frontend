import React from 'react'
import FormikContainerProfile from '../components/form/FormikContainerProfile'
import { useSelector } from "react-redux"
import usePageText from '../hooks/usePageText'


const ProfileEditMyWay = () => {
    const lang = useSelector(state => state.langFont.lang)
    const pageText = usePageText("profile")
    return (
        <div>
            <h1>myway</h1>
            <FormikContainerProfile pageText={pageText} />

        </div>
    )
}

export default ProfileEditMyWay