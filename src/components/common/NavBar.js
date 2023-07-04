import React, { useEffect, useState } from "react"
import logo from "../../images/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_LANG, LOGOUT } from "../../reducers/actionTypes"
import useLocalStorage from "../../hooks/useLocalStorage"
import { Link } from "react-router-dom"
import {
    AwesomeToggleLeft,
    AwesomeToggleRight,
    Hamburger,
    Mail
} from "../../styles/Icons"
import Dropdown from "./Dropdown"
import useClickOutside from "../../hooks/useClickOutside"
import text from "../../text/navbar.json"

//text used to translate navbar has to be separate from the page so we can't use
//text from the useState
const NavBar = () => {
    //get the current language from the store to set the language of localstorage if it is not yet set
    const currentLangFont = useSelector(state => state.langFont)
    const [lang, setLang] = useLocalStorage("lang", currentLangFont.lang)
    const [navText, setNavText] = useState(text[currentLangFont.lang])
    const [dropdown, setDropdown] = useState(false)
    const user = useSelector(state => state.profile)

    const dispatch = useDispatch()

    //everytime setLang changes or when the page first loads, change the language in the store
    useEffect(() => {
        dispatch({ type: CHANGE_LANG, lang: lang })
        setNavText(text[lang])
    }, [lang])

    const handleHamburger = () => {
        dropdown ? setDropdown(false) : setDropdown(true)
    }

    const dropdownItemsEN = [
        { text: navText.SIGN_UP, link: `/register` },
        { text: navText.LOGIN, link: `/login` },
        { text: navText.ABOUT, link: '/about' },
        { text: navText.COMMUNITY, link: null }]


    const dropdownItems = [
        { text: navText.SIGN_UP, link: `/register` },
        { text: navText.LOGIN, link: `/login` },
        { text: navText.ABOUT, link: '/about' },
        { text: navText.STUDY_SUPPORT, link: null },
        { text: navText.COMMUNITY, link: null }]

    //keys refer to the position of the array in the dropdownItems array
    const dropdownSubItemsEN =
    {
        3: {
            items: [
                { text: navText.ENGLISH_COMMUNITY, link: null },
                { text: navText.REGIONAL_COMMUNITY, link: null },
                { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                { text: navText.MARKETPLACE, link: null }
            ]
        }
    }

    const dropdownSubItems =
    {
        3: {
            items: [
                { text: navText.WHAT_WE_SUPPORT, link: null },
                { text: navText.PRICING, link: null }
            ]
        },
        4: {
            items: [
                { text: navText.ENGLISH_COMMUNITY, link: null },
                { text: navText.REGIONAL_COMMUNITY, link: null },
                { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                { text: navText.MARKETPLACE, link: null }
            ]
        }
    }


    const dropdownItemsLoggedInEN =
        [
            { text: `Hi, ${user.profile && user.profile.username}`, link: null },
            { text: navText.ABOUT, link: '/about' },
            { text: navText.COMMUNITY, link: null }
        ]

    const dropdownItemsLoggedIn =
        [
            { text: `Hi, ${user.profile && user.profile.username}`, link: null },
            { text: navText.ABOUT, link: '/about' },
            { text: navText.STUDY_SUPPORT, link: null },
            { text: navText.COMMUNITY, link: null }
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

        2: {
            items:
                [
                    { text: navText.ENGLISH_COMMUNITY, link: null },
                    { text: navText.REGIONAL_COMMUNITY, link: null },
                    { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                    { text: navText.MARKETPLACE, link: null }
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
        2: {
            items:
                [
                    { text: navText.WHAT_WE_SUPPORT, link: null },
                    { text: navText.PRICING, link: null }
                ]
        },
        3: {
            items:
                [
                    { text: navText.ENGLISH_COMMUNITY, link: null },
                    { text: navText.REGIONAL_COMMUNITY, link: null },
                    { text: navText.STUDY_BUDDY, link: '/study-buddies' },
                    { text: navText.MARKETPLACE, link: null }
                ]
        }
    }


    const closeNav = () => {
        setDropdown(false)
    }
    const ref = useClickOutside(closeNav)

    return (

        <nav className="my-4 mx-2 flex justify-between flex-no-wrap">
            <Link to='/'>
                <button className="flex items-center">
                    <img src={logo} className="h-12" alt="Pebbles logo" />
                </button>
            </Link>
            <div className="flex flex-nowrap items-center gap-5">
                <div className="flex  items-center px-4 flex-nowrap">
                    <div className="flex gap-3 items-center">
                        <span className={`cursor-pointer text-primary-dark text-mobile-card-header font-poppins font-medium ${lang === "EN" ? 'border-b-2' : ''}`} onClick={() => setLang("EN")}>EN </span>
                        <span className={`cursor-pointer text-primary-dark text-mobile-card-header font-poppins font-medium ${lang === "JA" ? 'border-b-2' : ''}`} onClick={() => setLang("JA")}>JA</span>
                    </div>
                </div>
                {user.token ?
                    <Link to="/messages"><Mail /></Link>
                    : ""}
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
                    }</span>

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