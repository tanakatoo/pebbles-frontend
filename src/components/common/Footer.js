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
    }, lang)
    return (
        <>
            <div className='bg-primary text-white flex flex-col md:flex-row items-center md:items-start justify-center md:space-around py-8'>
                <div className='flex flex-col items-center md:items-start mx-4 md:mx-8 md:max-w-[400px]'>
                    <p className='text-mobile-section-header font-PoppinsBold'>Pebbles Community</p>
                    <p className='pb-8 text-center md:text-left'>{text.SLOGAN}</p>
                </div>
                <div className='flex flex-col justify-center items-center md:items-start md:ms-8 lg:ms-16'>

                    {lang === "JA" ?
                        (<><p className='font-NotoSansJPBold'>{text.STUDY_SUPPORT}</p>
                            <p className='md:ps-3'>{text.WHAT_WE_SUPPORT}</p>
                            <p className='ps-3 pb-4'>{text.PRICING}</p>
                        </>)
                        : ''}
                    <p className='font-NotoSansJPBold'>{text.COMMUNITY}</p>
                    <p className='md:ps-3'>{text.ENGLISH_COMMUNITY}</p>
                    <p className='md:ps-3'>{text.REGIONAL_COMMUNITY}</p>
                    <p className='md:ps-3'>{text.STUDY_BUDDY}</p>
                    <p className='pb-4 md:ps-3'>{text.MARKETPLACE}</p>
                    <p className='font-NotoSansJPBold'>{text.COMPANY}</p>
                    <p className='md:ps-3'>{text.ABOUT}</p>
                    <p className='md:ps-3 pb-4'>{text.CONTACT_US}</p>

                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row items-center bg-primary text-white px-4 gap-2'>
                <p className='grow'>Copyright &#169; 2023 {text.COPYRIGHT}</p>
                <p>{text.TERMS}</p>
                <p>{text.PRIVACY}</p>
            </div>
        </>
    )
}

export default Footer