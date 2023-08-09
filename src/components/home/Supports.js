import React from 'react'
import { Button } from '../button/Button'

function Supports({ img, title, construction = null, link, desc, bgColor, font, titleColor = 'text-primary-dark', descColor = 'text-black', button = null }) {

  return (
    <div className={`${bgColor} pt-8 pb-12 px-8 flex-col flex md:flex-row md:px-24 lg:px-48`}>
      <div className="mx-auto shrink-0 p-4">
        <img className='rounded-full object-cover w-48 h-48' src={img} />
      </div>
      <div className='flex flex-col grow lg:ps-8'>
        <p className={`text-center lg:text-left mt-6 mx-8 ${font} text-mobile-page-header mb-4 ${titleColor}`}>{title}</p>
        {construction && <p className={`text-center lg:text-left mt-2 mx-8 mb-4 ${titleColor}`}>{construction}</p>}
        <p className={`${descColor} text-center lg:text-left lg:mx-8`}>{desc}</p>
        <div className='mx-auto lg:ms-8 mt-8'>
          {button ? button : <Button btnText="Tell me more" py='py-2' link={link} />}
        </div>
      </div>
    </div >
  )
}

export default Supports