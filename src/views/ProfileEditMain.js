import React from 'react'
import EditTitle from '../components/profile/EditTitle'
import { useSelector } from 'react-redux'
import usePageText from '../hooks/usePageText'
import Avatar from '../components/common/Avatar'

import { Camera } from '../styles/Icons'
import EditSection from '../components/profile/EditSection'
import { Link } from 'react-router-dom'

function ProfileEditMain() {

    const user = useSelector(state => state.profile.profile)
    const [pageText, lang] = usePageText('profile')

    return (
        <div className='ProfileEditMain border-t-2 border-gray'>
            <div className='pb-24 max-w-[800px] mx-auto '>
                <EditTitle title={pageText.EDIT_ACCT} backLink={`/users/${user.username}`} />
                <div className='w-full py-2 inline-flex justify-center mb-6'>
                    <Link to="/users/profile/edit/avatar"><div className='relative' >
                        <Avatar src={user.avatar} size='profile' username={user.username} />
                        <div className='absolute bottom-0 right-0 p-1.5 bg-gray-background rounded-full'>
                            <Camera />
                        </div>
                    </div>
                    </Link>
                </div>
                <div className='border-gray border-t-2 '>
                    <Link to="/users/profile/edit/profile"><EditSection title={pageText.PROFILE} lang={lang} /></Link>
                </div>
                {lang === "JA" ?
                    <div className='border-gray border-t-2 '>
                        <Link data-testid="profileEditMainMyWay" to="/users/profile/edit/myway"><EditSection title={pageText.MYWAY} lang={lang} /></Link>
                    </div>
                    : ''}
                <div className='border-gray border-t-2 border-b-2 '>
                    <Link data-testid="profileEditMainStudyBuddy" to="/users/profile/edit/study-buddy"><EditSection title={pageText.STUDY_BUDDY} lang={lang} /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditMain