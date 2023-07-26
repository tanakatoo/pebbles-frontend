import React from 'react'

import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'

function Card({ data, screen = null, latest = false }) {
  //get own username
  const username = useSelector(state => state.profile.profile.username)
  moment.locale();

  return (
    <div className={`${latest ? 'pb-2 pt-2' : 'pb-2'} col-span-full flex items-center`}>
      <div className='flex flex-col flex-grow px-4'>
        <p className={`whitespace-pre-wrap rounded-ml p-3 text-mobile-body-2 shadow-sm break-words
            ${username === data.from ? 'self-end ms-12 bg-accent-very-light' : 'me-12 bg-white '}`}>
          {data.msg}</p>
      </div>
    </div >
  )
}

export default Card