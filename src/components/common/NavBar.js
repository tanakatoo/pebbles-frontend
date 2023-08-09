import React, { useEffect, useState } from "react"
import logo from "../../images/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_LANG, LOGOUT } from "../../reducers/actionTypes"
import useLocalStorage from "../../hooks/useLocalStorage"
import { Link } from "react-router-dom"
import {
    AwesomeChevronDown,
    AwesomeToggleLeft,
    AwesomeToggleRight,
    Hamburger,
    Mail
} from "../../styles/Icons"
import Dropdown from "./Dropdown"
import useClickOutside from "../../hooks/useClickOutside"
import text from "../../text/navbar.json"
import CustomLinkPrimaryMedium from "../button/CustomLinkPrimaryMedium"
import DropdownOnce from "./DropdownOnce"
import { Button } from "../button/Button"
import Avatar from "./Avatar"

//text used to translate navbar has to be separate from the page so we can't use
//text from the useState
const NavBar = () => {
    //get the current language from the store to set the language of localstorage if it is not yet set
    const currentLangFont = useSelector(state => state.langFont)
    const [lang, setLang] = useLocalStorage("lang", currentLangFont.lang)
    const [navText, setNavText] = useState(text[currentLangFont.lang])
    const [dropdown, setDropdown] = useState(false)
    const user = useSelector(state => state.profile)
    const [communityDropdown, setCommunityDropdown] = useState(false)
    const [studySupportDropdown, setStudySupportDropdown] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)

    const dispatch = useDispatch()

    //everytime setLang changes or when the page first loads, change the language in the store
    useEffect(() => {
        dispatch({ type: CHANGE_LANG, lang: lang })
        setNavText(text[lang])
    }, [lang])

    const handleHamburger = () => {
        dropdown ? setDropdown(false) : setDropdown(true)
    }

    const handleCommunityDropdown = () => {
        communityDropdown ? setCommunityDropdown(false) : setCommunityDropdown(true)
    }

    const handleStudySupportDropdown = () => {
        studySupportDropdown ? setStudySupportDropdown(false) : setStudySupportDropdown(true)
    }

    const handleProfileDropdown = () => {
        profileDropdown ? setProfileDropdown(false) : setProfileDropdown(true)
    }


    const dropdownItemsEN = [
        { text: navText.SIGN_UP, link: `/register` },
        { text: navText.LOGIN, link: `/login` },
        { text: navText.COMMUNITY, link: null },
        { text: navText.ABOUT, link: '/about' },
        { text: navText.CONTACT_US, link: '/contact' }
    ]


    const dropdownItems = [
        { text: navText.SIGN_UP, link: `/register` },
        { text: navText.LOGIN, link: `/login` },
        { text: navText.STUDY_SUPPORT, link: null },
        { text: navText.COMMUNITY, link: null },
        { text: navText.ABOUT, link: '/about' },
        { text: navText.CONTACT_US, link: '/contact' }]

    //keys refer to the position of the array in the dropdownItems array
    const dropdownSubItemsEN =
    {
        2: {
            items: [
                { text: navText.LANGUAGE_TOWN, link: '/language-town' },
                { text: navText.INFO_CENTER, link: '/info-center' },
                { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                { text: navText.MARKETPLACE, link: '/marketplace' }
            ]
        }
    }

    const dropdownSubItems =
    {
        2: {
            items: [
                { text: navText.WHAT_WE_SUPPORT, link: '/study-support' },
                { text: navText.PRICING, link: '/study-support/pricing' }
            ]
        },
        3: {
            items: [
                { text: navText.LANGUAGE_TOWN, link: '/language-town' },
                { text: navText.INFO_CENTER, link: '/info-center' },
                { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                { text: navText.MARKETPLACE, link: '/marketplace' }
            ]
        }
    }


    const dropdownItemsLoggedInEN =
        [
            { text: `Hi, ${user.profile && user.profile.username}`, link: null },
            { text: navText.COMMUNITY, link: null },
            { text: navText.ABOUT, link: '/about' },
            { text: navText.CONTACT_US, link: '/contact' }
        ]

    const dropdownItemsLoggedIn =
        [
            { text: `Hi, ${user.profile && user.profile.username}`, link: null },
            { text: navText.STUDY_SUPPORT, link: null },
            { text: navText.COMMUNITY, link: null },
            { text: navText.ABOUT, link: '/about' },
            { text: navText.CONTACT_US, link: '/contact' }

        ]

    const dropdownSubItemsLoggedInEN =
    {
        0: {
            items:
                [
                    { text: navText.DASHBOARD, link: '/users/dashboard' },
                    { text: navText.PROFILE, link: `/users/${user.profile && user.profile.username}` },
                    { text: navText.MESSAGES, link: '/messages' },
                    { text: navText.SAVED, link: '/users/saved' },
                    // { text: navText.SETTINGS, link: null },
                    { text: navText.LOGOUT, link: '/logout' }
                ]
        },

        1: {
            items:
                [
                    { text: navText.LANGUAGE_TOWN, link: '/language-town' },
                    { text: navText.INFO_CENTER, link: '/info-center' },
                    { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                    { text: navText.MARKETPLACE, link: '/marketplace' }
                ]
        }
    }


    const dropdownSubItemsLoggedIn =
    {
        0: {
            items:
                [
                    { text: navText.DASHBOARD, link: '/users/dashboard' },
                    { text: navText.PROFILE, link: `/users/${user.profile && user.profile.username}` },
                    { text: navText.MESSAGES, link: '/messages' },
                    { text: navText.SAVED, link: '/users/saved' },
                    // { text: navText.SETTINGS, link: null },
                    { text: navText.LOGOUT, link: '/logout' }
                ]
        },
        1: {
            items:
                [
                    { text: navText.WHAT_WE_SUPPORT, link: '/study-support' },
                    { text: navText.PRICING, link: '/study-support/pricing' }
                ]
        },
        2: {
            items:
                [
                    { text: navText.LANGUAGE_TOWN, link: '/language-town' },
                    { text: navText.INFO_CENTER, link: '/info-center' },
                    { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                    { text: navText.MARKETPLACE, link: '/marketplace' }
                ]
        }
    }


    const closeNav = () => {
        setDropdown(false)
    }
    const closeCommunityDropdown = () => {
        setCommunityDropdown(false)
    }
    const closeStudySupportDropdown = () => {
        setStudySupportDropdown(false)
    }
    const closeProfileDropdown = () => {
        setProfileDropdown(false)
    }
    const ref = useClickOutside(closeNav)
    const refCommunityDropdown = useClickOutside(closeCommunityDropdown)
    const refStudySupportDropdown = useClickOutside(closeStudySupportDropdown)
    const refProfileDropdown = useClickOutside(closeProfileDropdown)

    return (

        <nav className="py-4 px-2 md:px-4 flex justify-between flex-no-wrap z-50 border-b border-gray-stroke">
            <Link to='/'>
                <button className="flex items-center">
                    <img src={logo} className="h-12" alt="Pebbles logo" />
                </button>
            </Link>
            <div className="flex flex-nowrap items-center gap-5 lg:grow">
                <div className="hidden lg:block grow">
                    <div className={`flex ps-10 ${lang === "EN" ? 'gap-16' : 'gap-10'} justify-center items-center w-full grow text-primary-dark`}>
                        {lang === "JA" ?
                            <span onClick={handleStudySupportDropdown} className="relative select-none" ref={refStudySupportDropdown}>
                                <CustomLinkPrimaryMedium text={navText.STUDY_SUPPORT} /> <AwesomeChevronDown />
                                {studySupportDropdown && <DropdownOnce items={dropdownSubItems[2].items}
                                    closeDropdown={handleStudySupportDropdown}
                                    css="right-0 top-8 shadow-dropdown text-primary text-mobile-body-2"
                                    pr="pr-8"
                                    width='w-[180px]'
                                    lang={lang}
                                />}
                            </span>
                            : ''}

                        <span onClick={handleCommunityDropdown} className="relative select-none" ref={refCommunityDropdown}>
                            <CustomLinkPrimaryMedium text={navText.COMMUNITY} /> <AwesomeChevronDown />
                            {communityDropdown && <DropdownOnce items={dropdownSubItems[3].items}
                                closeDropdown={handleCommunityDropdown}
                                css="right-0 top-8 shadow-dropdown text-primary text-mobile-body-2"
                                pr="pr-8"
                                width='w-[250px]'
                                lang={lang}
                            />}
                        </span>

                        <span >
                            <CustomLinkPrimaryMedium path="/about" text={navText.ABOUT} className="select-none" />
                        </span>
                        <span><CustomLinkPrimaryMedium path="/contact" text={navText.CONTACT_US} className="select-none" /></span>


                    </div>

                </div>

                <div className="flex  items-center px-4 flex-nowrap ">
                    <div className="flex gap-3 items-center">
                        <span className={`cursor-pointer text-primary-dark text-mobile-card-header font-poppins font-medium ${lang === "EN" ? 'border-b-2' : ''}`} onClick={() => setLang("EN")}>EN </span>
                        <span className={`cursor-pointer text-primary-dark text-mobile-card-header font-poppins font-medium ${lang === "JA" ? 'border-b-2' : ''}`} onClick={() => setLang("JA")}>JA</span>
                    </div>
                </div>
                {user.token ?
                    <Link to="/messages"><Mail /></Link>
                    : ""}
                <div className="lg:hidden">
                    <span className="cursor-pointer relative" ref={ref} onClick={handleHamburger} >
                        <Hamburger className="ml-5 " />
                        {lang === "JA" ?
                            dropdown && <Dropdown items={user.token ? dropdownItemsLoggedIn : dropdownItems}
                                subitems={user.token ? dropdownSubItemsLoggedIn : dropdownSubItems}
                                css="right-0 top-8 shadow-dropdown text-primary text-mobile-body-2"
                                pr="pr-8"
                                width='w-[250px]'
                                lang={lang}
                            /> :
                            dropdown && <Dropdown items={user.token ? dropdownItemsLoggedInEN : dropdownItemsEN}
                                subitems={user.token ? dropdownSubItemsLoggedInEN : dropdownSubItemsEN}
                                css="right-0 top-8 shadow-dropdown text-primary text-mobile-body-2"
                                pr="pr-8"
                                width='w-[250px]'
                                lang={lang}
                            />
                        }
                    </span>
                </div>
                {!user.token ?
                    <div className="hidden lg:flex">
                        <span >
                            <Button link="/login"
                                btnText={navText.LOGIN}
                                extraClasses="select-none border border-primary-dark"
                                py='py-1'
                                bkColor="bg-white"
                                textColor="text-primary-dark" />
                        </span>
                        <span className="ms-2">
                            <Button link="/register"
                                btnText={navText.SIGN_UP}
                                extraClasses="select-none border border-primary-dark"
                                py='py-1' />
                        </span>

                    </div>
                    :
                    <div onClick={handleProfileDropdown}
                        className="hidden lg:flex relative cursor-pointer shrink-0"
                        ref={refProfileDropdown}>
                        <Avatar username={user.profile.username}
                            src={user.profile.avatar}
                            noDropdownShadow={true}
                            size='navbar'
                        />
                        {profileDropdown && <DropdownOnce items={dropdownSubItemsLoggedIn[0].items}
                            closeDropdown={handleProfileDropdown}

                            css="right-0 top-8 shadow-dropdown text-primary text-mobile-body-2"
                            pr="pr-4"
                            top='top-14'
                            width='w-[180px]'
                            lang={lang}
                        />}
                    </div>}
            </div>
        </nav >
        // <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">

        //     <div className="w-full flex items-center justify-between mx-auto p-4">
        //         <a href="#" className="flex items-center">
        //             <img src={logo} className="h-12" alt="Pebbles logo" />
        //         </a>
        //         <button onClick={() => setLang("EN")}>English</button>
        //         <button onClick={() => setLang("JA")}>Japanese</button>
        //         <button><Link to={`/${lang}/login`}>Login</Link></button>
        //         <button onClick={logout}> Logout</button>
        //         <button><Link to='/change-password'>requestPassword</Link></button>
        //         <button><Link to='/reset-password'>setpassword</Link></button>
        //         <button><Link to='/users/ktoo'> Profile</Link></button>
        //         <button><Link to='/register'>Register</Link></button>
        //         {/* <div className="flex">
        //             <ul className=" flex font-medium p-4 md:p-0 mt-4">

        //                 <li>
        //                     <button onClick={displayDropDown} className="absolute items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown </button>
        //                     {dropdownDisplay && <NavBarDropDown />}
        //                 </li>
        //                 <li>
        //                     <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div className="">
        //             Login
        //         </div> */}
        //     </div>
        // </nav>

    )
}
export default NavBar