import React from 'react'

import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'

function Card({ data, screen = null, latest = false }) {
  //get own username
  const username = useSelector(state => state.profile.profile.username)
  moment.locale();
  let message = data.msg
  if (screen === "main" && data.msg.length > 30) {
    message = data.msg.slice(0, 30) + "..."
  }


  return (
    <div className={`${latest ? 'pb-1 pt-4' : 'py-4'} col-span-full flex items-center`}>
      {screen ?
        // <div className='shrink-0 pt-1 w-[50px] h-[50px] rounded-full border text-gray-stroke'>

        //   <Link to={`/messages/${username === data.from ? data.to : data.from}`}>
        //     <img className=' rounded-full h-full mx-auto'
        //       src={`./avatars/${username === data.from ? data.toavatar : data.fromavatar}`} />
        //   </Link >
        // </div>
        <Avatar link={`/messages/${username === data.from ? data.to : data.from}`}
          src={username === data.from ? data.toavatar : data.fromavatar} />
        : ""
      }

      <div className='flex flex-col flex-grow px-4'>
        {screen ?
          <Link to={`/messages/${username === data.from ? data.to : data.from}`}>
            <p className={`text-mobile-body-2  ${(!data.read && username === data.to) && screen ? "text-link" : ""}`} >
              {username === data.from ? data.to : data.from}
            </p>
            <p className={`${(!data.read && username === data.to) && screen ? "text-link" : ""}`} >{message}</p>
          </Link >
          :
          <>
            <p className={`rounded-ml p-3 text-mobile-body-2 shadow-sm  break-all
            ${username === data.from ? 'self-end ms-12 bg-accent-very-light' : 'me-12 bg-white '}`}>
              {message}</p>
          </>
        }
      </div>
      {screen && <p className='text-gray text-mobile-label-2'>{moment(data.sent_at).format('l')}</p>}

    </div >
  )
}

export default Card