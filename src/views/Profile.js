import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import { useLocation, useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useDispatch } from 'react-redux'
import determineLocation from '../helpers/determineLocation'
import { Switch, Tab } from '@headlessui/react'
import usePageText from '../hooks/usePageText'
import dbText from "../text/db.json"
import Spinner from '../components/common/Spinner'
import NoData from '../components/common/NoData'
import useSetToken from '../hooks/useSetToken'
import Avatar from '../components/common/Avatar'
import { Button } from "../components/button/Button"
import { AwesomeEmptyHeart, AwesomeSolidHeart, MailWhite } from '../styles/Icons'
import DisplayInfo from '../components/profile/DisplayInfo'
import { actionSaveProfile } from '../reducers/actionCreator'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const { username } = useParams()
    const locationRouter = useLocation()
    const [pageText, lang] = usePageText("profile")

    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const [currentProfile, setCurrrentProfile] = useState(null)
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [tabs, setTabs] = useState([pageText.PROFILE, pageText.STUDY_BUDDY])
    const [location, setLocation] = useState('')
    const dispatch = useDispatch()
    const [enabled, setEnabled] = useState(false)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [saved, setSaved] = useState(false)
    const navigate = useNavigate()


    //get the user public profile
    let res
    useEffect(() => {

        const getUser = async () => {
            try {
                setErrors([])

                setDoneGettingData(false);
                res = await UserApi.getUserInfo(username);
                console.log('is this me?', res.myProfile)
                setCurrrentProfile(res);
                setLocation(determineLocation(res, lang));
                setEnabled(res.study_buddy_active)
                if (res.myProfile) {
                    //if it is their own profile, save the profile in the state for easy access
                    dispatch(actionSaveProfile(res))
                }

                //get saved users, did the login user save this user?
                if (token && !res.myProfile) {
                    const savedUsers = await UserApi.getSavedUsers()
                    const savedUsersUsernames = savedUsers.map(u => u.username)
                    if (savedUsersUsernames.includes(res.username)) {
                        //logged in user saved this user
                        setSaved(true)
                    }
                }

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
                //if we came from study buddies or editing study buddy then go to that tab

                if (locationRouter.state &&
                    (locationRouter.state.fromLocation === '/study-buddies' ||
                        locationRouter.state.fromLocation === '/users/profile/edit/study-buddy')) {
                    setSelectedTabIndex(lang === "JA" ? 2 : 1)
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

    useEffect(() => {
        //if user switches from study buddy in JA to EN, there is no 3rd tab in EN so we have to 
        //set it ourselves
        if (selectedTabIndex === 2) {
            setSelectedTabIndex(1)
        }
    }, [lang])

    const saveUser = async () => {
        try {
            if (saved) {
                const unSaveUser = await UserApi.unsaveUser(username);
                setSaved(false)
            } else {
                const saveUser = await UserApi.saveUser(username);
                setSaved(true)
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

    const navigateToCTA = (link) => {
        navigate(link)
    }

    return (
        <div className='border-t-2 pt-4 border-gray'>
            <div className={`container mx-auto mt-2 ${lang === "EN" ? 'font-poppins' : 'font-NotoSansJPRegular'}`}>
                {errors.length > 0 ? <ServerError msg={errors} /> :

                    !currentProfile && errors.length === 0 && doneGettingData === false ?
                        <div className=' my-24'>
                            <Spinner />
                        </div>
                        : doneGettingData === true && !currentProfile ?
                            <NoData msg={pageText.NO_DATA_MSG} link='/' linkText={pageText.NO_DATA_LINK_TXT} />
                            :

                            <>
                                <div className='grid grid-cols-4 grid-row-1 my-2 '>
                                    <div className='col-span-2 flex'>
                                        <div className='flex flex-col items-center gap-2'>
                                            <Avatar src={currentProfile.avatar} size='profile' link={true} username={currentProfile.username} />

                                            <p data-testid="profileUsername">{currentProfile.username}</p>
                                            {currentProfile.myProfile &&
                                                <p className='text-link text-mobile-label-2'>
                                                    <Link to="/users/profile/edit">{pageText.EDIT}</Link>
                                                </p>}

                                        </div>
                                    </div>
                                    <div className='col-span-2 flex flex-col items-center justify-center gap-4'>
                                        {currentProfile.myProfile ?
                                            <>
                                                {lang === "JA"
                                                    ?
                                                    currentProfile.premium_join_date && !currentProfile.premium_end_date ?
                                                        <><div className='flex justify-center md:w-[180px]'>
                                                            <Button px="px-8"
                                                                py="py-1"

                                                                btnText={pageText.CTA_BTN}
                                                                lang={lang}
                                                                extraClasses='border-primary border-2 text-mobile-body-2'
                                                            />
                                                        </div>
                                                            <p className='text-center text-mobile-label-2'>{pageText.CTA_TXT}</p>
                                                        </>
                                                        :
                                                        currentProfile.free_trial_start_date ?
                                                            <>
                                                                <div className='flex justify-center md:w-[180px]'>
                                                                    <Button px="px-8"
                                                                        py="py-1"
                                                                        btnText={pageText.PREMIUM_BTN}
                                                                        lang={lang}
                                                                        extraClasses='border-primary border-2 w-[180px] text-mobile-body-2'
                                                                    />
                                                                </div>
                                                                <p className='text-center  text-mobile-label-2'>{pageText.PREMIUM_TXT}</p>

                                                            </>
                                                            :
                                                            <>
                                                                <div className='flex justify-center md:w-[180px]'>

                                                                    <Button px="px-8"
                                                                        py="py-1"
                                                                        btnText={pageText.FREE_TRIAL_BTN}
                                                                        lang={lang}
                                                                        extraClasses={`w-full border-primary border-2 text-mobile-body-2`}
                                                                    />
                                                                </div>
                                                                <p className='text-center  text-mobile-label-2'>{pageText.FREE_TRIAL_TXT}</p>

                                                            </>
                                                    :
                                                    <>
                                                        <div className='flex justify-center md:w-max'>
                                                            <Button px="px-8"
                                                                py="py-1"
                                                                btnText={pageText.CTA_BTN}
                                                                lang={lang}
                                                                clickMethod={() => navigateToCTA(pageText.CTA_LINK)}
                                                                extraClasses='border-primary border-2 text-mobile-body-2'
                                                            />
                                                        </div>
                                                        <p className='text-center  text-mobile-label-2'>{pageText.CTA_TXT}</p>
                                                    </>
                                                }

                                            </>
                                            : currentProfile.role === "admin" ?
                                                <><div className='flex justify-center md:w-[180px]'>
                                                    <Button px="px-8"
                                                        py="py-1"
                                                        btnText={pageText.CTA_BTN}
                                                        lang={lang}
                                                        clickMethod={() => navigateToCTA(pageText.CTA_LINK)}
                                                        extraClasses='border-primary border-2 text-mobile-body-2'
                                                    />
                                                </div>
                                                    <p className='text-center  text-mobile-label-2'>{pageText.CTA_TXT}</p>
                                                </> :
                                                <>
                                                    <div className='flex justify-center md:w-[180px]'>
                                                        <Button px="px-8"
                                                            py="py-1"
                                                            bkColor="bg-white"
                                                            extraClasses=' text-mobile-body-2 '
                                                            textColor="text-primary-dark"
                                                            btnText={pageText.SAVE_BTN}
                                                            clickMethod={saveUser}
                                                            lang={lang}
                                                            noShadow={true}
                                                            disabled={token ? false : true}
                                                            icon={saved ? <AwesomeSolidHeart /> : <AwesomeEmptyHeart />} />
                                                    </div>
                                                    <div className='flex justify-center md:w-[180px]'>
                                                        <Button px="px-8"
                                                            py="py-1"
                                                            link={`/messages/${currentProfile.username}`}
                                                            lang={lang}
                                                            btnText={pageText.MESSAGE_BTN}
                                                            extraClasses='border-primary border-2  text-mobile-body-2'
                                                            disabled={token ? false : true}
                                                            icon={<MailWhite />} />
                                                    </div>
                                                </>}
                                    </div>
                                </div>
                                <div className='w-full mt-6'>
                                    <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
                                        <Tab.List className="flex justify-between max-[500px]:flex-col">
                                            <Tab className="w-full max-[500px]:py-2 pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:text-primary-dark
                                        ui-selected:font-bold
                                        ui-selected:outline-none">
                                                {tabs[0]}</Tab>
                                            {currentProfile.myProfile && lang === "JA" &&
                                                <Tab className={`w-full max-[500px]:py-2 pb-3 border-b-2 
                                            ui-not-selected:border-b-gray-stroke
                                            text-gray-text 
                                            ui-selected:text-primary-dark
                                            ui-selected:font-bold
                                            ui-selected:outline-none`}>
                                                    {tabs[1]}</Tab>
                                            }
                                            <Tab className="w-full max-[500px]:py-2 pb-3 border-b-2 
                                        ui-not-selected:border-b-gray-stroke
                                        text-gray-text
                                        ui-selected:font-bold
                                        ui-selected:text-primary-dark
                                        ui-selected:outline-none">
                                                {currentProfile.myProfile && lang === "JA" ? tabs[2] : tabs[1]}</Tab>
                                        </Tab.List>
                                        <div className='my-6'>
                                            <Tab.Panels className='max-w-[800px] mx-auto'>
                                                <Tab.Panel >
                                                    <DisplayInfo label={pageText.NAME} lang={lang} data={currentProfile.name} checkExists={false} />
                                                    {currentProfile.myProfile &&
                                                        <DisplayInfo label={`${pageText.EMAIL} ${pageText.NOT_DISPLAYED}`} lang={lang} data={currentProfile.email} checkExists={false} />}
                                                    <DisplayInfo label={pageText.ABOUT} lang={lang} data={currentProfile.about} checkExists={false} />
                                                    <DisplayInfo label={pageText.LOCATION} lang={lang} data={location} checkExists={false} />


                                                </Tab.Panel>
                                                {currentProfile.myProfile && lang === "JA" &&

                                                    <Tab.Panel>
                                                        <p>{pageText.PRIVACY}</p>
                                                        {lang === "JA" ? <>
                                                            <DisplayInfo label={pageText.ADVICE} lang={lang} data={currentProfile.myway_advice} checkExists={false} />
                                                            <DisplayInfo label={pageText.READING_LEVEL} lang={lang} data={currentProfile.raz_reading_level} checkExists={false} />
                                                            <DisplayInfo label={pageText.MYWAY_LANGUAGE_LEVEL} lang={lang} data={currentProfile.myway_language_level} jsonName='language_levels' />
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
                                                    {currentProfile.myProfile ?
                                                        <Switch.Group>
                                                            <div className="flex items-center">
                                                                <Switch.Label className="mr-4 font-medium text-mobile-section-header">{pageText.STUDY_BUDDY_JOIN_LABEL}</Switch.Label>
                                                                <Switch
                                                                    checked={enabled}
                                                                    onChange={setEnabled}
                                                                    disabled={true}
                                                                    className={`${enabled ? 'bg-primary-light-1' : 'bg-gray'
                                                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                                                >
                                                                    <span
                                                                        className={`${enabled ? 'translate-x-6' : 'translate-x-1 ms-1'
                                                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                                                    />
                                                                </Switch>
                                                            </div>
                                                        </Switch.Group>
                                                        : ''}
                                                    {currentProfile.study_buddy_active || currentProfile.myProfile ?
                                                        <>
                                                            <p className='mt-1'>{pageText.HIDDEN}</p>
                                                            <DisplayInfo label={pageText.BUDDY_TYPE} lang={lang} data={currentProfile.study_buddy_types.map(
                                                                (t, idx) => idx === currentProfile.study_buddy_types.length - 1 ?
                                                                    dbText.study_buddy_types[t][lang] : dbText.study_buddy_types[t][lang] + ', '
                                                            )} jsonName='study_buddy_types' checkExists={false} />
                                                            <DisplayInfo label={pageText.NATIVE_LANG} lang={lang} jsonName='languages' data={currentProfile.native_language} />
                                                            <DisplayInfo label={pageText.LEARNING_LANG} lang={lang} jsonName='languages' data={currentProfile.learning_language} />
                                                            <DisplayInfo label={pageText.LANGUAGE_LEVEL} lang={lang} jsonName='language_levels' data={currentProfile.language_level} />
                                                            <DisplayInfo label={pageText.PURPOSE} lang={lang} data={currentProfile.study_buddy_purpose} checkExists={false} />
                                                            <DisplayInfo label={pageText.STUDY_WAY} lang={lang} data={currentProfile.study_buddy_bio} checkExists={false} />
                                                            <DisplayInfo label={pageText.TIME_ZONE} lang={lang} jsonName='timezones' data={currentProfile.time_zone} />
                                                            <DisplayInfo label={pageText.AGE_RANGE} lang={lang} jsonName='age_ranges' data={currentProfile.age_range} />
                                                            <DisplayInfo label={pageText.GENDER} lang={lang} jsonName='genders' data={currentProfile.gender} />
                                                        </>
                                                        :
                                                        <div className='my-12'>
                                                            <p className='text-center'>{currentProfile.username} is not currently participating in study buddy.</p>
                                                        </div>}
                                                </Tab.Panel>
                                            </Tab.Panels>
                                        </div>
                                    </Tab.Group>
                                </div>
                            </>


                }
            </div >
        </div>
    )
}

export default Profile