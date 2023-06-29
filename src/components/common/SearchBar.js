import React from 'react'
import { useSelector } from 'react-redux'
import searchText from "../../text/searchBar.json"
import { Button } from '../button/Button'

function SearchBar({ handleSearch, btn = false }) {
    const lang = useSelector(state => state.langFont.lang)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('go search')
            handleSearch()
        }
    }

    return (
        <div className='w-full flex gap-3'>
            {btn ? btn : null}
            <input className={`rounded-ml grow placeholder-gray`}
                type="text"
                onKeyDown={handleKeyDown}
                placeholder={searchText[lang].PLACEHOLDER} />
        </div>
    )
}

export default SearchBar