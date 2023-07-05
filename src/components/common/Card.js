import React from 'react'
import Avatar from './Avatar'


function Card({ data, goToProfileOnClick, topRight, underAvatar, main, buddy = false }) {

  return (
    <div className={`${buddy ? 'w-full md:w-[70%] lg:w-[45%]' : 'w-usercard'}  flex p-4 bg-primary-very-light rounded-ml `}>
      <div className='pe-4 flex flex-col'>

        <Avatar username={data.username} link={`/users/${data.username}`}
          src={data.avatar}
          size='user' />
        {underAvatar}
      </div>
      <div className='flex flex-col flex-grow '>
        <div className='flex flex-col
        md:flex-row'>
          <p className={`grow font-bold text-primary-dark mb-1 cursor-pointer
          md:mb-0`} onClick={() => goToProfileOnClick(data.username)}>
            {data.username}
          </p>
          {topRight}
        </div>
        {main}
      </div>
    </div >
  )
}

export default Card