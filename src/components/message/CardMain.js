import React from 'react'

import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'
import truncateText from '../../helpers/truncateText'

function CardMain({ data }) {
  //get own username
  const username = useSelector(state => state.profile.profile.username)
  moment.locale();
  const message = truncateText(data.msg, 30)


  return (
    <div className={`pb-8 col-span-full flex items-center`}>

      <Avatar link={`/messages/${username === data.from ? data.to : data.from}`}
        src={username === data.from ? data.toavatar : data.fromavatar}
        username={username === data.from ? data.to : data.from} />

      <div className='flex flex-col flex-grow px-4'>

        <Link to={`/messages/${username === data.from ? data.to : data.from}`}>
          <p className={`whitespace-pre-wrap text-mobile-body-2  ${(!data.read && username === data.to) ? "text-secondary-dark" : ""}`} >
            {username === data.from ? data.to : data.from}
          </p>
          <p className={`${(!data.read && username === data.to) ? "text-secondary-dark" : ""}`} >{message}</p>
        </Link >

      </div>
      <p className='text-gray text-mobile-label-2'>{moment(data.sent_at).format('l')}</p>

    </div >
  )
}

export default CardMain