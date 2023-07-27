import React, { useState, useRef } from 'react'
import { v4 as uuid } from "uuid"
import { AwesomeChevronDown } from '../../styles/Icons'
import { NavLink } from 'react-router-dom'

function Dropdown({ lang, items, subitems = {}, divide = false, css = null, pr = null, width = null }) {
    console.log('subitems', subitems)
    const [dropdown, setDropdown] = useState({ id: null, display: false })

    const handleClickingItself = (e) => {
        console.log('a drpodown so not close', e.target.parentElement.id)
        if (e.target.id ||
            e.target.parentElement.id ||
            e.target.parentElement.parentElement.id ||
            e.target.parentElement.parentElement.parentElement.id) {

            e.stopPropagation()
        }
    }

    const handleDropdown = (e) => {
        //only the dropdown menus with subitems have IDs so we are checking whether something clicked has an id
        let theID

        theID = e.target.parentElement.id ? e.target.parentElement.id :
            e.target.parentElement.parentElement.id ? e.target.parentElement.parentElement.id :
                e.target.parentElement.parentElement.parentElement.id

        if (e.target.parentElement.id ||
            e.target.parentElement.parentElement.id ||
            e.target.parentElement.parentElement.parentElement.id) {
            console.log('dropping down display is', dropdown.display)
            dropdown.display ? setDropdown({ id: null, display: false }) : setDropdown({ id: theID, display: true })
        }
    }
    console.log('dropdown display is', dropdown)
    return (
        <div onClick={handleClickingItself} className={`z-50 whitespace-nowrap absolute bg-white ${css}`}>
            <ul className={divide ? 'divide-gray divide-y' : ''}>
                {items.map((i, idx) => {
                    return (
                        <div key={uuid()} className={`text-primary-dark  `} >
                            <li className={`py-3 px-4 font-medium`} >
                                {console.log('link is', i.text, i.link)}
                                {i.link ?
                                    <NavLink to={`${i.link}`} className={({ isActive }) => isActive ? "text-secondary-dark" : " hover:underline hover:underline-offset-4"}>

                                        <div className={`flex `} >
                                            <span className={`grow ${width ? width : ''} ${pr ? pr : ''} `}>
                                                {i.text}
                                            </span>
                                            {pr && subitems[idx] &&
                                                <span ><AwesomeChevronDown /></span>
                                            }
                                        </div>
                                    </NavLink>
                                    : <div className='flex ' id={idx} onClick={handleDropdown}>
                                        <span className={`grow ${width ? width : ''} ${pr ? pr : ''}  hover:underline hover:underline-offset-4`}>
                                            {i.text}
                                        </span>
                                        {pr && subitems[idx] &&
                                            <span ><AwesomeChevronDown /></span>
                                        }
                                    </div>
                                }

                            </li>
                            {
                                subitems[idx] && dropdown.display && dropdown.id == idx ?
                                    subitems[idx].items.map(j => {
                                        return (
                                            <li key={uuid()} className='ms-4 py-3 px-4 text-gray-text'>

                                                {j.link
                                                    ?
                                                    <NavLink to={`${j.link}`} className={({ isActive }) => isActive ? 'text-secondary-dark font-bold flex' : "hover:underline hover:underline-offset-4 flex"}  >
                                                        {j.text}
                                                    </NavLink>
                                                    :
                                                    <span className=' text-gray cursor-default'>

                                                        {j.text}
                                                    </span>}
                                            </li>
                                        )
                                    })
                                    : ''
                            }
                        </div>
                    )
                })}
            </ul >
        </div >
    )
}

export default Dropdown
