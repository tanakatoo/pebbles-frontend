import React, { useState, useRef } from 'react'
import { v4 as uuid } from "uuid"
import { AwesomeChevronDown } from '../../styles/Icons'

function Dropdown({ items, subitems = {}, divide = false, css = null, pr = null, width = null }) {
    const [dropdown, setDropdown] = useState({ id: null, display: false })

    const handleClickingItself = (e) => {
        e.stopPropagation()
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

            dropdown.display ? setDropdown({ id: null, display: false }) : setDropdown({ id: theID, display: true })
        }
    }

    return (
        <div onClick={handleClickingItself} className={`z-10 whitespace-nowrap absolute bg-white ${css}`}>
            <ul className={divide ? 'divide-gray divide-y' : ''}>
                {items.map((i, idx) => {
                    return (
                        <div key={uuid()} >
                            <li className='py-3 px-4' >
                                <div className='flex ' id={idx} onClick={handleDropdown}>
                                    <span className={`grow ${width ? width : ''} ${pr ? pr : ''}`}>{i}</span>
                                    {pr && subitems[idx] &&
                                        <span ><AwesomeChevronDown /></span>
                                    }
                                </div>
                            </li>
                            {subitems[idx] && dropdown.display && dropdown.id == idx ? subitems[idx].items.map(j => <li key={uuid()} className='py-3 px-4 text-gray-text'>{j}</li>) : ''}
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Dropdown
