import React from 'react'
import SearchBar from '../components/common/SearchBar'
import useFormData from '../hooks/useFormData'
import { useLocation } from 'react-router-dom'

function Search() {
    const [data, setData, handleChange, resetData] = useFormData('')
    const location = useLocation()
    const

    const submitSearch = () => {
        console.log(data.siteWideSearch)
    }

    return (
        <div>
            <div className="bg-primary-dark py-6 px-4">
                <SearchBar name='siteWideSearch' onSubmit={submitSearch} handleChange={handleChange} />
            </div>
            <p>Results go here</p>
        </div>
    )
}

export default Search