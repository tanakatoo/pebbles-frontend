import React from 'react'
import FormikContainerProfile from '../components/form/FormikContainerProfile'
import { useSelector } from "react-redux"
import usePageText from '../hooks/usePageText'
import EditTitle from '../components/profile/EditTitle'

const ProfileEdit = () => {
    window.scrollTo(0, 0);
    const [pageText, lang] = usePageText("profile")
    return (
        <div className='ProfileEdit '>
            <div className='container mx-auto'>
                <EditTitle title={pageText.EDIT_PROFILE} backLink={`/users/profile/edit`} />
            </div>
            <FormikContainerProfile pageText={pageText} />

        </div>
    )
}

export default ProfileEdit