import React from 'react'
import { Button } from '../button/Button'

function Supports({ img, title, desc, bgColor, font, titleColor = 'text-primary-dark', descColor = 'text-black', button = null }) {

  return (
    <div className={`${bgColor} pt-8 pb-12 px-8 flex-col flex md:flex-row`}>
      <div className="mx-auto shrink-0 p-4"><img className='rounded-full object-cover w-48 h-48' src={img} /></div>
      <div className='flex flex-col grow'>
        <p className={`text-center lg:text-left mt-6 mx-8 ${font} text-mobile-page-header mb-4 ${titleColor}`}>{title}</p>
        <p className={`${descColor} text-center lg:text-left lg:mx-8`}>{desc}</p>
        <div className='mx-auto lg:ms-8 mt-8'>
          {button ? button : <Button btnText="Tell me more" py='py-2' />}
        </div>
      </div>
    </div >
  )
}

export default Supports