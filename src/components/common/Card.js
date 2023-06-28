import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'
import { Mail, AwesomeSolidHeart } from '../../styles/Icons'
import determineLocation from '../../helpers/determineLocation'

function Card({ data, lang, handleClick }) {
  //location data
  const location = determineLocation(data, lang)

  let about = ''
  if (data.about && data.about.length > 50) {
    about = data.about.slice(0, 50) + "..."
  }
  return (
    <div className={`w-usercard  flex p-4 bg-primary-very-light rounded-ml `}>
      <div className='pe-4'>
        <Avatar link={`/users/${data.username}`}
          src={data.avatar}
          size='user' />
      </div>
      <div className='flex flex-col flex-grow '>
        <div className='flex '>
          <p className={`grow font-bold text-primary-dark`}><Link to={`/users/${data.username}`}>{data.username}</Link></p>
          <p className='shrink-0 cursor-pointer' onClick={() => handleClick(data.username)}><AwesomeSolidHeart size='lg' /></p>
        </div>
        <p className='mt-1'>{about}This would be the about section</p>

      </div>


    </div >
  )
}

export default Card