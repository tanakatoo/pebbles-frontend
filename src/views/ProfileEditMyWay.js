import React from 'react'
import FormikContainerMyWay from '../components/form/FormikContainerMyWay'
import { useSelector } from "react-redux"
import usePageText from '../hooks/usePageText'
import EditTitle from '../components/profile/EditTitle'

const ProfileEditMyWay = () => {

    const [pageText, lang] = usePageText("profile")
    return (
        <div>
            <EditTitle title={pageText.EDIT_MYWAY} backLink={`/users/profile/edit`} />
            <FormikContainerMyWay pageText={pageText} />

        </div>
    )
}

export default ProfileEditMyWay