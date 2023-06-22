import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import navtext from '../../text/navbar.json'

function Footer() {
    const lang = useSelector(state => state.langFont.lang)
    const [text, setFooterText] = useState(navtext[lang])
    const user = useSelector(state => state.profile.token)

    useEffect(() => {
        setFooterText(navtext[lang])
    }, [lang])
    return (
        <div className=' bg-primary-dark text-white'>
            <div className='px-8 pt-12  flex flex-col lg:flex-row items-center  lg:items-start  lg:justify-between py-8 xl:justify-around'>
                <div className='flex flex-col items-center ms-4  lg:items-start  lg:max-w-[300px]'>
                    <p className='text-mobile-section-header font-PoppinsBold'>Pebbles Community</p>
                    <p className='pb-8 text-center lg:text-left'>{text.SLOGAN}</p>
                </div>
                {lang === "JA" ?
                    (<div className='flex flex-col justify-center items-center lg:items-start lg:ms-8'>
                        <p className='font-NotoSansJPBold'>{text.STUDY_SUPPORT}</p>
                        <p className=''>{text.WHAT_WE_SUPPORT}</p>
                        <p className=' pb-4'>{text.PRICING}</p>
                    </div>)
                    : ''}
                <div className='flex flex-col justify-center items-center me-4 lg:items-start lg:ms-8'>
                    <p className='font-NotoSansJPBold'>{text.COMPANY}</p>
                    <p className=''>{text.ABOUT}</p>
                    <p className='pb-4'>{text.CONTACT_US}</p>
                </div>
                <div className='flex flex-col text-center justify-center items-center lg:items-start lg:ms-8'>
                    <p className='font-NotoSansJPBold'>{text.COMMUNITY}</p>
                    <p className=''>{text.ENGLISH_COMMUNITY}</p>
                    <p className=''>{text.REGIONAL_COMMUNITY}</p>
                    <p className=''>{text.STUDY_BUDDY}</p>
                    <p className='pb-4'>{text.MARKETPLACE}</p>
                </div>

            </div >
            <div className='flex flex-col-reverse md:flex-row items-center px-4 gap-2 '>
                <p className='grow'>Copyright &#169; 2023 {text.COPYRIGHT}</p>
                <p>{text.TERMS}</p>
                <p>{text.PRIVACY}</p>
            </div>
        </div>
    )
}

export default Footer