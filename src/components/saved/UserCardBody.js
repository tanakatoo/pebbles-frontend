import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'
import { Mail, AwesomeSolidHeart } from '../../styles/Icons'
import determineLocation from '../../helpers/determineLocation'
import Save from '../common/Save'

function UserCardBody({ data }) {

    let about = ''
    if (data.about && data.about.length > 50) {
        about = data.about.slice(0, 50) + "..."
    }
    return (
        <p className='mt-1'>{data.about}</p>
    )
}

export default UserCardBody