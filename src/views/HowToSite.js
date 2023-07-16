import React, { useEffect } from 'react'
import usePageText from '../hooks/usePageText'
import { HashLink } from 'react-router-hash-link'
import { AwesomeArrowRightLong, AwesomeArrowUpLong } from '../styles/Icons'

function HowToSite() {
    const [pageText, lang] = usePageText("howToSite")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='py-8 flex flex-col border-t-2 border-gray' id="top">
            <h1 className='text-center font-bold text-mobile-header-1 mb-8'>{pageText.TITLE}</h1>
            <div className='w-full flex flex-col pt-4 md:pt-8 pb-12 px-2 bg-primary-super-light '>
                <div className=' mx-auto flex flex-col '>

                    <div className='my-1 ' >
                        <div className='group'>
                            <HashLink to="#link-profile" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                {pageText.PROFILE}
                                <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                    <AwesomeArrowRightLong />
                                </span>
                            </HashLink>
                        </div>
                    </div>
                    <div className='my-1 '>
                        <div className='group'>
                            <HashLink to="#link-studyBuddy" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                {pageText.STUDY_BUDDY}
                                <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                    <AwesomeArrowRightLong />
                                </span>
                            </HashLink>
                        </div>
                    </div>
                    <div className='my-1 '>
                        <div className='group'>
                            <HashLink to="#link-studyBuddyUse" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                {pageText.STUDY_BUDDY_USE}
                                <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                    <AwesomeArrowRightLong />
                                </span>
                            </HashLink>
                        </div>
                    </div>

                </div>
            </div >

            <div className='container flex flex-col mx-auto mt-8'>
                <div className='max-w-prose mx-auto'>
                    <h2 id="link-profile" className='me-auto text-mobile-section-header font-medium my-4'>
                        {pageText.PROFILE}</h2>
                    <p>{pageText.PROFILE_BODY}</p>
                </div>
                <div className='my-4 flex w-full justify-end' >
                    <HashLink to="#top">
                        <AwesomeArrowUpLong />
                        <span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>

                <div className='max-w-prose mx-auto'>
                    <h2 id="link-studyBuddy" className='pt-4 max-w-prose me-auto text-mobile-section-header font-medium my-4'>
                        {pageText.STUDY_BUDDY}</h2>
                    <p>{pageText.STUDY_BUDDY_BODY}</p>
                </div>
                <div className='my-4 flex w-full justify-end' >
                    <HashLink to="#top">
                        <AwesomeArrowUpLong />
                        <span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>

                <div className='max-w-prose mx-auto'>
                    <h2 id="link-studyBuddyUse" className='pt-4 max-w-prose me-auto text-mobile-section-header font-medium my-4'>
                        {pageText.STUDY_BUDDY_USE}</h2>
                    <p>{pageText.STUDY_BUDDY_USE_BODY}</p>
                </div>
                <div className='my-4 flex w-full justify-end' >
                    <HashLink to="#top">
                        <AwesomeArrowUpLong />
                        <span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
            </div>
        </div>
    )
}
export default HowToSite