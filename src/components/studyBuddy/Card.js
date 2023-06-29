import React from 'react'
import Avatar from '../common/Avatar'
import { JapanFlag, AmericanFlag } from '../../styles/Icons'

function Card({ data, goToProfileOnClick, topRight, bottom, underUsername, buddy = false }) {

  return (
    <div className={`${buddy ? 'w-full md:w-[70%] lg:w-[45%]' : 'w-usercard'}  flex p-4 bg-primary-very-light rounded-ml `}>
      <div className='flex flex-col grow gap-2'>
        <div className='flex gap-4 items-center'>

          <Avatar onClick={goToProfileOnClick} username={data.username} link={`/users/${data.username}`}
            src={data.avatar}
            size={'user'} />


          <div className='flex flex-col grow'>
            <div className='grow flex flex-col md:flex-row items-start md:items-center'>
              <p className={`grow font-bold text-primary-dark mb-1 cursor-pointer
          md:mb-0`} onClick={() => goToProfileOnClick(data.username)}>
                {data.username}
              </p>
              <div className='mt-1'>
                {topRight}
              </div>
            </div>
            <div className='grow flex flex-col'>
              {underUsername}
            </div>
          </div>
        </div>
        {bottom}
      </div>
    </div >
  )
}

export default Card