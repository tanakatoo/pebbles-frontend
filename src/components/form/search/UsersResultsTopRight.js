import React from 'react'
import { Premium } from '../../../styles/Icons'

function UsersResultsTopRight({ data }) {
    return (
        <>
            {
                data.premium_acct_id && !data.end_date ?
                    <span className='text-mobile-label-1 '>
                        <div className='bg-marketplace-background rounded-full p-1'><Premium /></div>

                    </span >
                    : <></>
            }
        </>)
}

export default UsersResultsTopRight