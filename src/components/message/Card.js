import React from 'react'

import { useSelector } from 'react-redux'
import moment from 'moment/moment'

function Card({ data }) {
  //get own username
  const username = useSelector(state => state.profile.profile.username)
  moment.locale();
  const message = data.msg.slice(0, 30) + "..."

  return (
    <div className='py-4 col-span-full flex items-center'>
      <div className='shrink-0 pt-1 w-[50px] h-[50px] rounded-full border text-gray-stroke'><img className=' rounded-full h-full mx-auto' src={`./avatars/${username == data.from ? data.toavatar : data.fromavatar}`} /></div>
      <div className='flex flex-col flex-grow px-4'>
        <p className={`text-mobile-body-2 font-PoppinsMedium ${data.read ? "" : "text-link"}`} >{username == data.from ? data.to : data.from}</p>
        <p className={data.read ? "" : "text-link"} >{message}</p>
      </div>
      <p className='text-gray text-mobile-label-2'>{moment(data.sent_at).format('l')}</p>
    </div >
  )
}

export default Card