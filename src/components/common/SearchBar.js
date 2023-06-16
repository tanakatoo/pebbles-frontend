import React from 'react'

function SearchBar({ handleSearch }) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('go search')
            handleSearch()
        }
    }

    return (
        <div>
            <input type="text" onKeyDown={handleKeyDown} />
        </div>
    )
}

export default SearchBar