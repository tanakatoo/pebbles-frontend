import React, { useState } from "react"
import usePageText from "../hooks/usePageText"
import SearchBar from "../components/common/SearchBar"
import { Connect, Language, Travel } from "../styles/Icons"
import Mission from "../components/home/Mission"
import Supports from "../components/home/Supports"
import studybuddysquare from "../images/studyBuddy-square.jpg"
import communitysquare from "../images/community-square.jpg"
import regionalsquare from "../images/regional-square.jpg"
import marketplacesquare from "../images/marketplace-square.jpg"
import studysupportsquare from "../images/studysupport-square.jpg"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../components/button/Button"
import useFormData from "../hooks/useFormData"
import { useLocation, useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { HashLink } from 'react-router-hash-link';
import AuthApi from "../api/auth"
import { actionLogin } from "../reducers/actionCreator"
import ServerError from "../components/form/ServerError"
import { Link } from "react-router-dom"


const Home = () => {
    window.scrollTo(0, 0);
    const [pageText, lang] = usePageText("home")
    const dispatch = useDispatch()
    const token = useSelector(state => state.profile.token) //to check if user is logged in
    // const [data, setData, handleChange, resetData] = useFormData('')
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState([])

    console.log('token is', token)

    const submitSearch = async (values, { setSubmitting }) => {
        console.log('this is just the word to send',)
        navigate('/search', { state: { word: values.word, from: location.pathname } })
        setSubmitting(false)
    }

    const loginTestUser = async () => {

        if (!token) {
            //if user is not yet already logged in log them in with test user
            try {
                const res = await AuthApi.loginTestUser()
                console.log('res is', res)
                //call dispatch to set token in profileReducer
                dispatch(actionLogin(res)) //save token and then profile
                // setFlashMessage('LOGIN')

                navigate('/users/dashboard')
            } catch (e) {
                if (e instanceof TypeError) {
                    //means server is down
                    console.error('TypeError at login', e)
                    setErrors(["UNKNOWN"])
                } else {
                    console.error('Error at login', e)
                    setErrors(e)
                }
            }
        }
    }

    return (
        <div>
            <div className="bg-primary-dark py-6 px-4">
                <Formik
                    onSubmit={submitSearch}
                    initialValues={{ word: '' }}
                >
                    {
                        formik => {
                            return (
                                <Form>
                                    <SearchBar name='word' onSubmit={submitSearch} />
                                </Form>
                            )
                        }
                    }
                </Formik>

            </div>
            <div className='flex justify-center bg-primary-super-light bg-homeHero md:bg-homeHeroTablet lg:bg-homeHeroDesktop bg-cover bg-center bg-no-repeat relative min-h-screen' >
                <div className="bg-gradient-to-b absolute from-primary-super-light from-0% via-transparent via-1% to-transparent to-100% w-full h-screen"></div>
                {!token && <div className="absolute pt-5 cursor-pointer z-40 underline underline-offset-4 hover:text-gray-text">
                    <p onClick={loginTestUser}>{pageText.LOGIN_TESTUSER}</p></div>}
                {Object.keys(errors).length > 0 && <div className="z-40 absolute top-40"><ServerError msg={errors} title='Error logging in as test user' /></div>}

                <h1 className="text-primary-dark font-bold mx-4 text-center pt-10 md:pt-16 text-mobile-header-1 absolute">{pageText.H1}</h1>
            </div>
            <section className="pt-12 md:pt-24  mx-auto">
                <h2 className="text-center text-mobile-header-2 text-primary-dark font-medium">{pageText.H2}</h2>
                <div className="mt-8 md:mt-12 lg:ps-8 lg:pe-8 flex flex-col justify-center items-center gap-8 lg:flex-row lg:w-full lg:space-around">
                    <div className="mb-5 flex flex-col lg:w-full">
                        <Mission icon={<Connect />} text={pageText.MISSION1} />
                    </div>
                    <div className="mb-5  flex flex-col lg:w-full">
                        <Mission icon={<Travel />} text={pageText.MISSION2} />
                    </div>
                    <div className="mb-5  flex flex-col lg:w-full">
                        <Mission icon={<Language />} text={pageText.MISSION3} />
                    </div>
                </div>
            </section >
            <section className="pt-[84px] flex flex-col items-center">
                <div className="w-full bg-homeHelp md:bg-homeHelpTablet lg:bg-homeHelpDesktop h-[160px] md:h-[200px] lg:h-[250px] bg-cover bg-center">
                    {/* <div className="bg-gradient-to-b from-white absolute w-full h-[216px] z-10 "></div> */}
                </div>
                <div className="w-full text-center py-4 px-4 bg-primary text-white font-medium inline-flex items-center justify-center">
                    <p>{pageText.HERO2}</p>
                </div>
            </section >
            <section className="">
                <h2 className=" py-16 md:py-24 px-4 text-mobile-header-2 font-medium text-center text-primary-dark">{pageText.HOW_TO_HELP}</h2>
                <div className="">
                    {lang === "JA" ?
                        <Supports
                            font={`NotoSansJP font-medium`}
                            bgColor='bg-background'
                            link="/study-support"
                            img={studysupportsquare}
                            title={pageText.HELP5_TITLE}
                            construction={pageText.UNDER_CONSTRUCTION}
                            desc={pageText.HELP5_DESC} />
                        : ''
                    }
                    <Supports
                        font={`${lang === "EN" ? 'font-StudyBuddyEN' : 'font-StudyBuddyJA'} font-bold`}
                        bgColor='bg-study-buddy-accent'
                        link="/study-buddies"
                        img={studybuddysquare}
                        title={pageText.HELP3_TITLE}
                        desc={pageText.HELP3_DESC}
                        button=
                        {<Button lang={lang} btnText="Tell me more" hashLink={'/about#study-buddy'} textColor="text-primary-dark" py="py-2" bkColor="bg-white" type="button" />} />
                    <Supports
                        font={`font-Community font-medium text-gold-4`}
                        img={communitysquare}
                        title={pageText.HELP1_TITLE}
                        desc={pageText.HELP1_DESC}
                        bgColor={'bg-community-accent'}
                        titleColor="text-white"
                        descColor='text-white'
                        construction={pageText.UNDER_CONSTRUCTION}
                        button=
                        {<Button lang={lang} btnText="Tell me more" hashLink={'/about#language-town'} textColor="text-primary-dark" py="py-2" bkColor="bg-white" type="button" />} />
                    <Supports
                        font={`font-Regional text-gold-4`}
                        img={regionalsquare}
                        title={pageText.HELP2_TITLE}
                        desc={pageText.HELP2_DESC}
                        bgColor={'bg-regional-accent'}
                        titleColor="text-white"
                        descColor='text-white'
                        construction={pageText.UNDER_CONSTRUCTION}
                        button=
                        {<Button lang={lang} btnText="Tell me more" hashLink={'/about#info-center'} textColor="text-primary-dark" py="py-2" bkColor="bg-white" type="button" />} />
                    <Supports
                        font={`${lang === "EN" ? 'font-EnglishMarketEN' : 'font-EnglishMarketJA'} font-bold`}
                        bgColor='bg-marketplace-accent'
                        img={marketplacesquare}
                        title={pageText.HELP4_TITLE}
                        desc={pageText.HELP4_DESC}
                        construction={pageText.UNDER_CONSTRUCTION}
                        button=
                        {<Button lang={lang} btnText="Tell me more" hashLink={'/about#marketplace'} textColor="text-primary-dark" py="py-2" bkColor="bg-white" type="button" />} />
                </div>
            </section>
            <section className="py-12">
                <p className="py-8 px-4 text-mobile-page-header text-center text-primary-dark">{pageText.HERO3_TOP}</p>
                {/* <div className="flex relative bg-homeStartMobile md:bg-homeStartTablet lg:bg-homeStartDesktop h-[216px] md:h-[300px] lg:h-[350px] bg-cover bg-center">
                    <div className="bg-gradient-to-b absolute w-full h-[216px] z-10 from-white"></div>
                </div> */}
                <p className="px-4 text-mobile-page-header text-center text-primary-dark">{pageText.HERO3_BOTTOM}</p>
                <div className="flex justify-center">
                    <Button lang={lang} btnText="More about us" extraClasses="mt-12 w-[200px]" link='/about'></Button>
                </div>
            </section>
        </div >
    )

}

export default Home