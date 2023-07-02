import React from 'react'
import { useSelector } from 'react-redux'
import searchText from "../../text/searchBar.json"
import { Button } from '../button/Button'


function SearchBar({ name, searchWord, onSubmit, handleChange, btn = false }) {
    //better to use formik for this?
    const lang = useSelector(state => state.langFont.lang)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('go search')
            onSubmit()
        }
    }
    console.log(searchWord)
    return (
        <div className={`w-full flex  ${btn ? 'flex-col-reverse md:flex-row' : null} gap-3`}>
            {btn ? btn : null}
            <input className={`rounded-ml grow placeholder-gray`}
                type="text"
                name={name}
                value={searchWord}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={searchText[lang].PLACEHOLDER} />
        </div>
    )
}

export default SearchBar