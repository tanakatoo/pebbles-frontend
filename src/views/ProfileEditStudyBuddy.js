import React from 'react'
import FormikContainerStudyBuddy from '../components/form/FormikContainerStudyBuddy'
import { useSelector } from "react-redux"
import usePageText from '../hooks/usePageText'
import EditTitle from '../components/profile/EditTitle'

const ProfileEditMyWay = () => {
    const lang = useSelector(state => state.langFont.lang)
    const pageText = usePageText("profile")
    return (
        <div>
            <EditTitle title={pageText.EDIT_STUDY_BUDDY} backLink={`/users/profile/edit`} />
            <FormikContainerStudyBuddy pageText={pageText} />
        </div>
    )
}

export default ProfileEditMyWay