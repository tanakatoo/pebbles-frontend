import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import navtext from '../../text/navbar.json'
import CustomLink from '../button/CustomLink'

function Footer() {
    const lang = useSelector(state => state.langFont.lang)
    const [text, setFooterText] = useState(navtext[lang])
    const user = useSelector(state => state.profile.token)

    useEffect(() => {
        setFooterText(navtext[lang])
    }, [lang])
    return (
        <div className=' bg-primary-dark text-white'>
            <div className='px-8 pt-8  flex flex-col lg:flex-row items-center  lg:items-start  lg:justify-between py-8 xl:justify-around'>
                <div className='flex flex-col items-center md:ms-4  lg:items-start  lg:max-w-[300px]'>
                    <p className='text-mobile-page-header font-bold text-center'>Pebbles Community</p>
                    <p className='pb-8 text-center lg:text-left'>{text.SLOGAN}</p>
                </div>

                <div className='flex flex-col justify-center items-center me-4 lg:items-start lg:ms-8'>
                    <p className='font-medium'>{text.COMPANY}</p>
                    <p className='text-background'><Link to="/about" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.ABOUT}</Link></p>
                    <p className=' text-background'><Link to="/contact" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.CONTACT_US}</Link></p>
                    <p className='pb-4 text-background'><Link to="/faq" className='hover:underline hover: underline-offset-4 hover:text-white'>FAQ</Link></p>
                </div>
                {lang === "JA" ?
                    (<div className='flex flex-col justify-center items-center lg:items-start lg:ms-8'>
                        <p className='font-medium'>{text.STUDY_SUPPORT}</p>
                        <p className=''><Link to="/study-support" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.WHAT_WE_SUPPORT}</Link></p>
                        <p className=' pb-4'><Link to="/study-support/pricing" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.PRICING}</Link></p>
                    </div>)
                    : ''}
                <div className='flex flex-col text-center justify-center items-center lg:items-start lg:ms-8'>
                    <p className='font-medium'>{text.COMMUNITY}</p>
                    <p className='text-background'><Link to="/language-town" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.LANGUAGE_TOWN}</Link></p>
                    <p className='text-background'><Link to="/info-center" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.INFO_CENTER}</Link></p>
                    <p className='text-background'><Link to="/study-buddies" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.STUDY_BUDDY}</Link></p>
                    <p className='pb-4 text-background'><Link to="/marketplace" className='hover:underline hover: underline-offset-4 hover:text-white'>{text.MARKETPLACE}</Link></p>
                </div>

            </div >
            <div className='flex flex-col-reverse md:flex-row items-center px-4 gap-2 '>
                <p className='grow text-center md:text-left'>Copyright &#169; 2023 {text.COPYRIGHT}</p>
                <p>{text.TERMS}</p>
                <p>{text.PRIVACY}</p>
            </div>
        </div>
    )
}

export default Footer