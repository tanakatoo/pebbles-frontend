import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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


    //get the user public profile
    let res
    useEffect(() => {

        const getUser = async () => {
            try {
                setDoneGettingData(false);
                res = await UserApi.getUserInfo(username);
                setCurrrentProfile(res);
                setDoneGettingData(true);
                setLocation(determineLocation(res));

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
        setLocation(determineLocation(currentProfile))
        if (currentProfile) {

            setTabs(currentProfile.myProfile ? [pageText.PROFILE, pageText.MYWAY, pageText.STUDY_BUDDY] : [pageText.PROFILE, pageText.STUDY_BUDDY])
        }
    }, [pageText, currentProfile])


    function determineLocation(data) {
        let templocation
        if (data) {

            if (lang === "EN") {
                templocation = (data.country_en || data.state_en) && data.city_en ?
                    data.city_en + ', ' :
                    data.city_en ?
                        data.city_en :
                        ""
                templocation += data.country_en && data.state_en ?
                    data.state_en + ", " :
                    data.state_en ?
                        data.state_en :
                        ""
                templocation += data.country_en ?
                    data.country_en : ''

            } else {
                templocation = data.country_ja ?
                    data.country_ja : ''
                templocation += data.country_ja && data.state_ja ?
                    "、 " + data.state_ja :
                    data.state_ja ?
                        data.state_ja :
                        ""
                templocation += (data.country_ja || data.state_ja) && data.city_ja ?
                    '、 ' + data.city_ja :
                    data.city_ja ?
                        data.city_ja :
                        ""
            }
            return templocation
        }
    }



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
                                        <Avatar src={`../avatars/${currentProfile.avatar}`} size='profile' />

                                        <p>{currentProfile.username}</p>
                                        {currentProfile.myProfile && <p className='text-link text-mobile-label-2'>{pageText.EDIT}</p>}

                                    </div>
                                </div>
                                <div className='col-span-2 flex flex-col items-center justify-center gap-4'>
                                    {currentProfile.myProfile ?
                                        <>{lang === "JA"
                                            ?
                                            currentProfile.premium_join_date && currentProfile.premium_end_date ?
                                                <>
                                                    <Button px="px-8"
                                                        py="py-1"
                                                        btnText={pageText.CTA_BTN}
                                                        extraClasses='border-primary border-2 text-mobile-body-2'
                                                    />
                                                    <p className='text-center'>{pageText.CTA_TEXT}</p>
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
                                        ui-selected:outline-none">
                                            {tabs[0]}</Tab>
                                        {currentProfile.myProfile &&
                                            <Tab className="w-full pb-3 border-b-2 
                                            ui-not-selected:border-b-gray-stroke
                                            text-gray-text 
                                            ui-selected:text-black
                                            ui-selected:outline-none">
                                                {tabs[1]}</Tab>
                                        }
                                        <Tab className="w-full pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:text-black
                                        ui-selected:outline-none">
                                            {currentProfile.myProfile ? tabs[2] : tabs[1]}</Tab>
                                    </Tab.List>
                                    <div className='my-6'>
                                        <Tab.Panels>
                                            <Tab.Panel >
                                                <p className={`mb-2 text-mobile-section-header ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.ABOUT}</p>
                                                <p className='mt-2'>{currentProfile.about}</p>
                                                <p className={`mt-6 text-mobile-section-header ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`} >{pageText.LOCATION}</p>
                                                <p className='mt-2'>{location}</p>
                                                <p className={`mt-6 text-mobile-section-header ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`} >{pageText.EMAIL}</p>
                                                {currentProfile.myProfile && <p className='mt-2'>{currentProfile.email}</p>}
                                            </Tab.Panel>
                                            {currentProfile.myProfile &&

                                                <Tab.Panel>

                                                    <p className={`mb-2 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                        {pageText.ADVICE}
                                                    </p>
                                                    <p className='mt-2'>{currentProfile.myway_advice}</p>
                                                    <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                        {pageText.READING_LEVEL}
                                                    </p>
                                                    <p className='mt-2'>{currentProfile.raz_reading_level}</p>
                                                    <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                        {pageText.HABITS}
                                                    </p>
                                                    <p className='mt-2'>{currentProfile.myway_habits}</p>

                                                    <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                        {pageText.GOALS}
                                                    </p>
                                                    <p className='mt-2'>{currentProfile.goals.map(
                                                        (g, idx) => idx === currentProfile.goals.length - 1 ?
                                                            dbText.goals[g][lang] : dbText.goals[g][lang] + ', '
                                                    )}</p>
                                                    <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                        {pageText.MOTIVATION}
                                                    </p>
                                                    <p className='mt-2'>{dbText.motivation_levels[currentProfile.motivational_level][lang]}</p>
                                                    <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                        {pageText.SELF_STUDY}
                                                    </p>
                                                    <p className='mt-2'>{dbText.study_times[currentProfile.study_time][lang]}</p>


                                                </Tab.Panel>

                                            }
                                            <Tab.Panel>

                                                <p className={`mb-2 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.PURPOSE}
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_purpose}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.STUDY_WAY}
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_bio}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.BUDDY_TYPE}
                                                </p>
                                                <p className='mt-2'>{currentProfile.study_buddy_types.map(
                                                    (t, idx) => idx === currentProfile.study_buddy_types.length - 1 ?
                                                        dbText.study_buddy_types[t][lang] : dbText.study_buddy_types[t][lang] + ', '
                                                )}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.NATIVE_LANG}
                                                </p>
                                                <p className='mt-2'>{currentProfile.native_language}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.LEARNING_LANG}
                                                </p>
                                                <p className='mt-2'>{currentProfile.learning_language}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.LANGUAGE_LEVEL}
                                                </p>
                                                <p className='mt-2'>{currentProfile.language_level}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.TIME_ZONE}
                                                </p>
                                                <p className='mt-2'>{dbText.timezones[currentProfile.time_zone][lang]}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.AGE_RANGE}
                                                </p>
                                                <p className='mt-2'>{currentProfile.age_range}</p>
                                                <p className={`mt-6 text-mobile-section-header  ${lang === "EN" ? 'font-PoppinsMedium' : 'font-NotoSansJPMedium'}`}>
                                                    {pageText.GENDER}
                                                </p>
                                                <p className='mt-2'>{dbText.genders[currentProfile.gender][lang]}</p>
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