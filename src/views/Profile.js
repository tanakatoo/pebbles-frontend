import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useDispatch, useSelector } from 'react-redux'
import determineLocation from '../helpers/determineLocation'
import { Tab } from '@headlessui/react'
import usePageText from '../hooks/usePageText'
import ProfileTabProfile from '../components/common/ProfileTabProfile not used'
import dbText from "../text/db.json"
import Spinner from '../components/common/Spinner'
import NoData from '../components/common/NoData'
import useSetToken from '../hooks/useSetToken'
import Avatar from '../components/common/Avatar'
import { Button } from "../components/button/Button"
import { current } from '@reduxjs/toolkit'
import { AwesomeEmptyHeart, AwesomeSolidHeart, MailWhite } from '../styles/Icons'
import DisplayInfo from '../components/profile/DisplayInfo'
import { actionSaveProfile } from '../reducers/actionCreator'
import { Link } from 'react-router-dom'

/**this is used to display profiles of other users not the logged in user, 
 * so we do not need to set a token for this route
 *  if the logged in user goes here to look at their profile, it would display the public profile
 * */

const Profile = () => {
    const { username } = useParams()
    const pageText = usePageText("profile")
    const lang = useSelector(state => state.langFont.lang)
    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const [currentProfile, setCurrrentProfile] = useState(null)
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [tabs, setTabs] = useState([pageText.PROFILE, pageText.STUDY_BUDDY])
    const [location, setLocation] = useState('')
    const dispatch = useDispatch()


    //get the user public profile
    let res
    useEffect(() => {

        const getUser = async () => {
            try {
                setDoneGettingData(false);
                res = await UserApi.getUserInfo(username);
                setCurrrentProfile(res);
                console.log('got profile in viewing profile', res)
                setDoneGettingData(true);
                setLocation(determineLocation(res, lang));
                if (res.myProfile) {
                    //if it is their own profile, save the profile in the state for easy access
                    dispatch(actionSaveProfile(res))
                }
            } catch (e) {
                if (e instanceof TypeError) {
                    //means server is down
                    console.error(e)
                    setErrors(["UNKNOWN"])
                } else {
                    console.error(e)
                    setErrors(e)
                }
            }
        }
        getUser()

    }, [username])

    useEffect(() => {
        setLocation(determineLocation(currentProfile, lang))
        if (currentProfile) {

            setTabs(currentProfile.myProfile && lang === "JA" ? [pageText.PROFILE, pageText.MYWAY, pageText.STUDY_BUDDY] : [pageText.PROFILE, pageText.STUDY_BUDDY])
        }
    }, [pageText, currentProfile])

    return (
        <div className={`container mx-auto mt-2 ${lang === "EN" ? 'font-poppins' : 'font-NotoSansJPRegular'}`}>
            {errors.length > 0 && <ServerError msg={errors} />}
            {!currentProfile && errors.length === 0 && doneGettingData === false ?
                <div className=' my-24'>
                    <Spinner />
                </div>
                : doneGettingData === true && !currentProfile ?
                    <NoData msg={pageText.NO_DATA_MSG} link='/' linkText={pageText.NO_DATA_LINK_TXT} />
                    :
                    errors.length === 0 ?
                        <>
                            <div className='grid grid-cols-4 grid-row-1 m-2'>
                                <div className='col-span-2 flex'>
                                    <div className='flex flex-col items-center gap-2'>
                                        <Avatar src={currentProfile.avatar} size='profile' />

                                        <p>{currentProfile.username}</p>
                                        {currentProfile.myProfile && <p className='text-link text-mobile-label-2'><Link to="/users/profile/edit">{pageText.EDIT}</Link></p>}

                                    </div>
                                </div>
                                <div className='col-span-2 flex flex-col items-center justify-center gap-4'>
                                    {currentProfile.myProfile ?
                                        <>{lang === "JA"
                                            ?
                                            currentProfile.premium_join_date && !currentProfile.premium_end_date ?
                                                <>
                                                    <Button px="px-8"
                                                        py="py-1"
                                                        btnText={pageText.CTA_BTN}
                                                        extraClasses='border-primary border-2 text-mobile-body-2'
                                                    />
                                                    <p className='text-center'>{pageText.CTA_TXT}</p>
                                                </>
                                                :
                                                currentProfile.free_trial_start_date ?
                                                    <>
                                                        <Button px="px-8"
                                                            py="py-1"
                                                            btnText={pageText.PREMIUM_BTN}
                                                            extraClasses='border-primary border-2 w-[180px] text-mobile-body-2'
                                                        />
                                                        <p className='text-center'>{pageText.PREMIUM_TXT}</p>

                                                    </>
                                                    :
                                                    <>
                                                        <Button px="px-8"
                                                            py="py-1"
                                                            btnText={pageText.FREE_TRIAL_BTN}
                                                            extraClasses='border-primary border-2 w-[180px] text-mobile-body-2'
                                                        />
                                                        <p className='text-center'>{pageText.FREE_TRIAL_TXT}</p>

                                                    </>
                                            :
                                            <>
                                                <Button px="px-8"
                                                    py="py-1"
                                                    btnText={pageText.CTA_BTN}
                                                    extraClasses='border-primary border-2 text-mobile-body-2'
                                                />
                                                <p className='text-center'>{pageText.CTA_TXT}</p>
                                            </>
                                        }

                                        </>
                                        :
                                        <>
                                            <Button px="px-8"
                                                py="py-1"
                                                bkColor="bg-white"
                                                extraClasses='border-primary border-2 w-[180px] text-mobile-body-2'
                                                textColor="text-primary-dark"
                                                btnText={pageText.SAVE_BTN}
                                                icon={<AwesomeEmptyHeart />} />
                                            <Button px="px-8"
                                                py="py-1"
                                                btnText={pageText.MESSAGE_BTN}
                                                extraClasses='border-primary border-2 w-[180px] text-mobile-body-2'
                                                icon={<MailWhite />} />
                                        </>}
                                </div>
                            </div>
                            <div className='w-full mt-6'>
                                <Tab.Group defaultIndex={0}>
                                    <Tab.List className="flex justify-between">
                                        <Tab className="w-full pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:text-primary-dark
                                        ui-selected:font-bold
                                        ui-selected:outline-none">
                                            {tabs[0]}</Tab>
                                        {currentProfile.myProfile && lang === "JA" &&
                                            <Tab className={`w-full pb-3 border-b-2 
                                            ui-not-selected:border-b-gray-stroke
                                            text-gray-text 
                                            ui-selected:text-primary-dark
                                            ui-selected:font-bold
                                            ui-selected:outline-none`}>
                                                {tabs[1]}</Tab>
                                        }
                                        <Tab className="w-full pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:font-bold
                                        ui-selected:text-primary-dark
                                        ui-selected:outline-none">
                                            {currentProfile.myProfile && lang === "JA" ? tabs[2] : tabs[1]}</Tab>
                                    </Tab.List>
                                    <div className='my-6'>
                                        <Tab.Panels>
                                            <Tab.Panel >
                                                <DisplayInfo label={pageText.ABOUT} lang={lang} data={currentProfile.about} checkExists={false} />
                                                <DisplayInfo label={pageText.LOCATION} lang={lang} data={location} checkExists={false} />
                                                {currentProfile.myProfile &&
                                                    <DisplayInfo label={pageText.EMAIL} lang={lang} data={currentProfile.email} checkExists={false} />}

                                            </Tab.Panel>
                                            {currentProfile.myProfile && lang === "JA" &&

                                                <Tab.Panel>
                                                    <p>{pageText.PRIVACY}</p>
                                                    {lang === "JA" ? <>
                                                        <DisplayInfo label={pageText.ADVICE} lang={lang} data={currentProfile.myway_advice} checkExists={false} />
                                                        <DisplayInfo label={pageText.READING_LEVEL} lang={lang} data={currentProfile.raz_reading_level} checkExists={false} />
                                                        <DisplayInfo label={pageText.MYWAY_LANGUAGE_LEVEL} lang={lang} data={currentProfile.my_way_language_level} jsonName='language_levels' />
                                                        <DisplayInfo label={pageText.HABITS} lang={lang} data={currentProfile.myway_habits} checkExists={false} />
                                                        <DisplayInfo label={pageText.GOALS} lang={lang} data={
                                                            currentProfile.goals.map(
                                                                (g, idx) => idx === currentProfile.goals.length - 1 ?
                                                                    dbText.goals[g][lang] : dbText.goals[g][lang] + ', '
                                                            )}
                                                            checkExists={false} />
                                                        <DisplayInfo label={pageText.MOTIVATION} lang={lang} jsonName='motivation_levels' data={currentProfile.motivational_level} />
                                                        <DisplayInfo label={pageText.SELF_STUDY} lang={lang} jsonName='study_times' data={currentProfile.study_time} />
                                                    </>
                                                        : ''}
                                                </Tab.Panel>

                                            }
                                            <Tab.Panel>
                                                <DisplayInfo label={pageText.PURPOSE} lang={lang} data={currentProfile.study_buddy_purpose} checkExists={false} />
                                                <DisplayInfo label={pageText.STUDY_WAY} lang={lang} data={currentProfile.study_buddy_bio} checkExists={false} />
                                                <DisplayInfo label={pageText.BUDDY_TYPE} lang={lang} data={currentProfile.study_buddy_types.map(
                                                    (t, idx) => idx === currentProfile.study_buddy_types.length - 1 ?
                                                        dbText.study_buddy_types[t][lang] : dbText.study_buddy_types[t][lang] + ', '
                                                )} jsonName='study_buddy_types' checkExists={false} />
                                                <DisplayInfo label={pageText.NATIVE_LANG} lang={lang} jsonName='languages' data={currentProfile.native_language} />
                                                <DisplayInfo label={pageText.LEARNING_LANG} lang={lang} jsonName='languages' data={currentProfile.learning_language} />
                                                <DisplayInfo label={pageText.LANGUAGE_LEVEL} lang={lang} jsonName='language_levels' data={currentProfile.language_level} />
                                                <DisplayInfo label={pageText.TIME_ZONE} lang={lang} jsonName='timezones' data={currentProfile.time_zone} />
                                                <DisplayInfo label={pageText.AGE_RANGE} lang={lang} jsonName='age_ranges' data={currentProfile.age_range} />
                                                <DisplayInfo label={pageText.GENDER} lang={lang} jsonName='genders' data={currentProfile.gender} />

                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </div>
                                </Tab.Group>
                            </div>
                        </>



                        : ''
            }
        </div >
    )
}

export default Profile