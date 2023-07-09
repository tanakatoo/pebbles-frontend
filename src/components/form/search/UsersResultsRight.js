import React from 'react'

function UsersResultsRight({ data }) {
    return (
        <div className='flex flex-col text-mobile-card-body'>
            <p>{data.name}</p>
            <p className=' leading-4'>{data.about}</p>

        </div>
    )
}

export default UsersResultsRight