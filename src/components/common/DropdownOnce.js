import React, { useState, useRef } from 'react'
import { v4 as uuid } from "uuid"
import { AwesomeChevronDown } from '../../styles/Icons'
import { NavLink } from 'react-router-dom'

function DropdownOnce({ lang, top = null, items, closeDropdown, divide = false, css = null, pr = null, width = null }) {

    return (
        <div onClick={closeDropdown} className={`z-50 whitespace-nowrap absolute bg-white ${css} ${top}`}>
            <ul className={divide ? 'divide-gray divide-y' : ''}>
                {items.map((i, idx) => {
                    console.log(i.link)
                    return (
                        <div key={uuid()} className={`text-primary-dark  `} >
                            <li className={`py-3 px-4`} >
                                <NavLink to={`${i.link}`}
                                    className={({ isActive }) => isActive ? "text-secondary-dark" :
                                        " hover:underline hover:underline-offset-4"}>

                                    <div className={`flex `} >
                                        <span className={`grow ${width ? width : ''} ${pr ? pr : ''} `}>
                                            {i.text}
                                        </span>

                                    </div>
                                </NavLink>
                            </li>

                        </div>
                    )
                })}
            </ul >
        </div >
    )
}

export default DropdownOnce
