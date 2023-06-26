import React from 'react'
import FormikContainerProfile from '../components/form/FormikContainerProfile'
import { useSelector } from "react-redux"
import usePageText from '../hooks/usePageText'
import EditTitle from '../components/profile/EditTitle'

const ProfileEdit = () => {
    const lang = useSelector(state => state.langFont.lang)
    const pageText = usePageText("profile")
    return (
        <div>
            <EditTitle title={pageText.EDIT_PROFILE} backLink={`/users/profile/edit`} />
            <FormikContainerProfile pageText={pageText} />

        </div>
    )
}

export default ProfileEdit