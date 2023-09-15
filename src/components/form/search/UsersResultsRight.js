import React from 'react'

function UsersResultsRight({ data }) {
    if (data.about.length > 150) {
        data.about = data.about.slice(0, 150) + '...'
    }
    return (
        <div className='flex flex-col text-mobile-card-body'>
            <p>{data.name}</p>

            <span className='leading-4'>{data.about}</span>

        </div>
    )
}

export default UsersResultsRight