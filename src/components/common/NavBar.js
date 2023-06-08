import React, { useEffect, useState } from "react"
import logo from "../../images/logo.png"
import NavBarDropDown from "./NavBarDropDown"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_LANG, LOGOUT } from "../../reducers/actionTypes"
import useLocalStorage from "../../hooks/useLocalStorage"
import { Link } from "react-router-dom"
import { actionLogout } from "../../reducers/actionCreator"


const NavBar = () => {
    //get the current language from the store to set the language of localstorage if it is not yet set
    const currentLang = useSelector(state => state.langFont)

    const [lang, setLang] = useLocalStorage("lang", currentLang.lang)
    const dispatch = useDispatch()

    //everytime setLang changes or when the page first loads, change the language in the store
    useEffect(() => {
        dispatch({ type: CHANGE_LANG, lang: lang })
    }, [lang])

    const logout = () => {
        dispatch(actionLogout())
    }
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">

            <div className="w-full flex items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center">
                    <img src={logo} className="h-12" alt="Pebbles logo" />
                </a>
                <button onClick={() => setLang("EN")}>English</button>
                <button onClick={() => setLang("JA")}>Japanese</button>
                <button><Link to='/login'>Login</Link></button>
                <button onClick={logout}> Logout</button>
                <button><Link to='/change-password'>requestPassword</Link></button>
                <button><Link to='/reset-password'>setpassword</Link></button>
                <button><Link to='/users/ktoo'> Profile</Link></button>
                <button><Link to='/register'>Register</Link></button>
                {/* <div className="flex">
                    <ul className=" flex font-medium p-4 md:p-0 mt-4">

                        <li>
                            <button onClick={displayDropDown} className="absolute items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown </button>
                            {dropdownDisplay && <NavBarDropDown />}
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="">
                    Login
                </div> */}
            </div>
        </nav>

    )
}
export default NavBar