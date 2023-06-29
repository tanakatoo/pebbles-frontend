import React, { useEffect, useState } from 'react'
import usePageText from '../hooks/usePageText'
import PageTitle from '../components/common/PageTitle'
import Card from '../components/common/Card'
import determineLocation from '../helpers/determineLocation'
import { useSelector } from 'react-redux'
import UserApi from '../api/user'
import useSetToken from '../hooks/useSetToken'
import ServerError from '../components/form/ServerError'
import Spinner from '../components/common/Spinner'
import NoData from '../components/common/NoData'
import { v4 as uuid } from "uuid"
import Save from '../components/common/Save'
import UserCardBody from '../components/saved/UserCardBody'
import useNavigateToProfile from '../hooks/useNavigateToProfile'

function SavedUsers() {
    const pageText = usePageText('saved')
    const lang = useSelector(state => state.langFont.lang)
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const goToProFile = useNavigateToProfile()

    const getSavedUsers = async () => {
        try {
            setDoneGettingData(false);
            const res = await UserApi.getSavedUsers();

            setData(res);
            console.log(res)
            setDoneGettingData(true);


        } catch (e) {
            if (e instanceof TypeError) {
                //means server is down
                console.error(e)
                setErrors(["UNKNOWN"])
            } else {
                console.error(e)
                setErrors(e)
            }
        } finally {


        }
    }
    useEffect(() => {
        getSavedUsers()
    }, [])

    const handleClick = async (username) => {
        const res = await UserApi.unsaveUser(username);
        getSavedUsers()
    }

    return (
        <div className={`px-2 border-t border-t-gray-stroke `}>
            <PageTitle text={pageText.SAVED_USERS} extraClasses='my-3' />
            {errors.length > 0 && <ServerError msg={errors} />}
            {!data && errors.length === 0 && doneGettingData === false ?
                <div className=' my-24'>
                    <Spinner />
                </div>
                : doneGettingData === true && data.length === 0 ?
                    <div className='my-12'>
                        < NoData msg={pageText.NO_USERS_MSG} link='/users/saved' linkText={pageText.NO_USERS_LINK_TXT} />
                    </div>
                    :
                    <>
                        <div className='flex flex-wrap justify-center mb-12 gap-4'>
                            {data.map(d =>
                                <Card data={d}
                                    key={uuid()}
                                    goToProfileOnClick={goToProFile}
                                    lang={lang}
                                    topRight={<Save handleClick={handleClick} parameter={d.username} />}
                                    main={<UserCardBody data={d} />}
                                />)}

                        </div>
                    </>
            }
        </div >

    )
}

export default SavedUsers