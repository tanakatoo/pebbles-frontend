import React from 'react'
import { useSelector } from 'react-redux'
import searchText from "../../text/searchBar.json"

function SearchBar({ handleSearch }) {
    const lang = useSelector(state => state.langFont.lang)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('go search')
            handleSearch()
        }
    }

    return (
        <div>
            <input className='rounded-ml w-full placeholder-gray' type="text" onKeyDown={handleKeyDown} placeholder={searchText[lang].PLACEHOLDER} />
        </div>
    )
}

export default SearchBar