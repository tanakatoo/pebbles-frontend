import React from 'react'
import FormikContainerStudyBuddy from '../components/form/FormikContainerStudyBuddy'
import { useSelector } from "react-redux"
import usePageText from '../hooks/usePageText'
import EditTitle from '../components/profile/EditTitle'

const ProfileEditStudyBuddy = () => {
    window.scrollTo(0, 0);
    const [pageText, lang] = usePageText("profile")
    return (
        <div>
            <EditTitle title={pageText.EDIT_STUDY_BUDDY} backLink={`/users/profile/edit`} />
            <FormikContainerStudyBuddy pageText={pageText} />
        </div>
    )
}

export default ProfileEditStudyBuddy