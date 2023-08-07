import React from 'react'
import FormikContainerMyWay from '../components/form/FormikContainerMyWay'
import { useSelector } from "react-redux"
import usePageText from '../hooks/usePageText'
import EditTitle from '../components/profile/EditTitle'

const ProfileEditMyWay = () => {
    window.scrollTo(0, 0);
    const [pageText, lang] = usePageText("profile")
    return (
        <div data-testid="profileEditMyWay" className='ProfileEditMyWay'>
            <EditTitle title={pageText.EDIT_MYWAY} backLink={`/users/profile/edit`} />
            <FormikContainerMyWay pageText={pageText} />

        </div>
    )
}

export default ProfileEditMyWay