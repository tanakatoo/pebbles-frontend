import React, { useState } from 'react'
import usePageText from '../hooks/usePageText'
import { AwesomeCheck, AwesomeArrowRightLong, AwesomeUser, AwesomeArrowUpLong } from '../styles/Icons'
import CustomLink from '../components/button/CustomLink'
import { HashLink } from 'react-router-hash-link';
import { Button } from '../components/button/Button';

function About() {
    const [pageText, lang] = usePageText('about')
    const [moveRight, setMoveRight] = useState(false)

    return (
        <div>
            <div className='flex justify-center bg-primary-super-light bg-aboutHeroMobile md:bg-aboutHeroTablet lg:bg-aboutHeroDesktop bg-cover bg-center bg-no-repeat relative min-h-[250px]' >
                {/* <div className="bg-gradient-to-b absolute from-primary-super-light from-0% via-transparent via-1% to-transparent to-100% w-full min-h-[250px]"></div> */}
                {/* <div className="bg-white/50 absolute w-full min-h-[250px]"></div> */}
            </div>
            <h1 className="text-primary-dark font-bold mx-4 px-4 rounded-ml text-center mt-8 md:mt-12 text-mobile-header-1">{pageText.TITLE}</h1>

            <div className='flex flex-col mt-8 mx-2'>
                {/* <h2 className="font-medium text-mobile-page-header text-center mb-2">{pageText.BEGINNINGS_TITLE}</h2> */}
                <div className='container flex flex-col items-center mx-auto'>
                    <p className='max-w-prose'>{pageText.BEGINNINGS}</p>
                    <p className='my-4 max-w-prose'>{pageText.BEGINNINGS2}</p>
                    <div className='text-primary text-center my-1'><AwesomeCheck /> {pageText.BEGINNINGS3}</div>
                    <div className='text-primary text-center my-1'><AwesomeCheck /> {pageText.BEGINNINGS4}</div>
                    <div className='text-primary text-center my-1'><AwesomeCheck /> {pageText.BEGINNINGS5}</div>
                    <div className='text-primary text-center my-1'><AwesomeCheck /> {pageText.BEGINNINGS6}</div>

                    <p className='my-4  max-w-prose'>{pageText.BEGINNINGS7}</p>
                </div>
            </div >
            <h2 className="font-medium text-mobile-page-header text-center p-2 mt-12 md:mt-24 bg-primary-dark text-white">{pageText.COMMUNITIES}</h2>
            <div className='flex flex-col pt-4 pb-8 px-2 bg-primary-super-light '>
                <div className='container mx-auto flex flex-col items-center'>
                    <p className='mb-2 text-center'>{pageText.EXPLORE}</p>
                    {/* {lang === "JA" ? */}
                    <div className='text-center my-1' onMouseEnter={() => setMoveRight(true)} onMouseLeave={() => setMoveRight(false)}>

                        <HashLink to="#link-support" className='group hover:underline hover:underline-offset-4 hover:text-gray-text'>
                            {pageText.STUDY_SUPPORT_TITLE}<span className='group-hover:translate-x-2 group-hover:text-gray-text group-hover:transition-transform text-black ps-1'>
                                <AwesomeArrowRightLong /></span>
                        </HashLink>
                    </div>
                    {/* : '' */}
                    {/* } */}
                    <div className='text-center my-1 ' onMouseEnter={() => setMoveRight(true)} onMouseLeave={() => setMoveRight(false)}>
                        <HashLink to="#link-studyBuddy" className='hover:underline hover:underline-offset-4 hover:text-gray-text'>
                            {pageText.STUDY_BUDDY_TITLE}<span className={`${moveRight ? 'translate-x-2 text-gray-text transition-transform' : 'text-black transition-transform'} ps-1`}>
                                <AwesomeArrowRightLong /></span>
                        </HashLink>
                    </div>
                    <div className='text-center my-1 ' onMouseEnter={() => setMoveRight(true)} onMouseLeave={() => setMoveRight(false)}>
                        <HashLink to="#link-town" className='hover:underline hover:underline-offset-4 hover:text-gray-text'>
                            {pageText.TOWN_TITLE}<span className={`${moveRight ? 'translate-x-2 text-gray-text transition-transform' : 'text-black transition-transform'} ps-1`}>
                                <AwesomeArrowRightLong /></span>
                        </HashLink>
                    </div>
                    <div className='text-center my-1 ' onMouseEnter={() => setMoveRight(true)} onMouseLeave={() => setMoveRight(false)}>
                        <HashLink to="#link-info" className='hover:underline hover:underline-offset-4 hover:text-gray-text'>
                            {pageText.INFO_CENTER_TITLE}<span className={`${moveRight ? 'translate-x-2 text-gray-text transition-transform' : 'text-black transition-transform'} ps-1`}>
                                <AwesomeArrowRightLong /></span>
                        </HashLink>
                    </div>
                    <div className='text-center my-1 ' onMouseEnter={() => setMoveRight(true)} onMouseLeave={() => setMoveRight(false)}>
                        <HashLink to="#link-marketplace" className='hover:underline hover:underline-offset-4 hover:text-gray-text'>
                            {pageText.MARKETPLACE_TITLE}<span className={`${moveRight ? 'translate-x-2 text-gray-text transition-transform' : 'text-black transition-transform'} ps-1`}>
                                <AwesomeArrowRightLong /></span>
                        </HashLink>
                    </div>

                </div>
            </div >
            <div id="link-studyBuddy" className='flex justify-center bg-primary-super-light bg-studyBuddyLongMobile md:bg-studyBuddyLongTablet lg:bg-studyBuddyLongDesktop bg-cover bg-bottom bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className="font-medium text-mobile-page-header text-center mb-4 md:mb-12 p-2 bg-study-buddy-accent text-primary-dark">{pageText.STUDY_BUDDY_TITLE}</h2>
            <div className='container flex flex-col items-center mx-auto my-8'>
                <p className='max-w-prose'>{pageText.STUDY_BUDDY_TEXT}</p>
                <div className='flex flex-col my-4 max-w-prose'>
                    <div className='text-primary-dark  mb-2'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE1_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE1}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE2_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE2}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE3_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE3}</p>
                </div>
                <div className='my-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 md:mb-24 mt-4'>
                    <Button btnText={pageText.STUDY_BUDDY_BTN} link={'/study-buddies'} bkColor='bg-study-buddy-accent' textColor='text-primary-dark' />
                </div>
            </div>

            <div id="link-town" className='flex justify-center bg-primary-super-light bg-townLongMobile md:bg-townLongTablet lg:bg-townLongDesktop bg-cover bg-center bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className="font-medium font-Community text-mobile-page-header text-center mb-4 md:mb-12 p-2 bg-community-accent text-white">{pageText.TOWN_TITLE}</h2>
            <div className='container flex flex-col items-center mx-auto my-8'>
                <p className='max-w-prose'>{pageText.TOWN_TEXT1}</p>
                <p className='mb-2 mt-4 max-w-prose'>{pageText.TOWN_TEXT2}</p>
                <div className='my-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 md:mb-24 mt-4'>
                    <Button btnText={pageText.TOWN_BTN} link={'/study-buddies'} bkColor='bg-community-accent' textColor='text-white' />
                </div>
            </div>

            <div id="link-info" className='flex justify-center bg-primary-super-light bg-infoLongMobile md:bg-infoLongTablet lg:bg-infoLongDesktop bg-cover bg-center bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className="font-medium font-Regional  text-mobile-page-header text-center mb-4 md:mb-12 p-2 bg-regional-accent text-white">{pageText.INFO_CENTER_TITLE}</h2>
            <div className='container flex flex-col items-center mx-auto my-8'>
                <p className='max-w-prose'>{pageText.STUDY_BUDDY_TEXT}</p>
                <div className='flex flex-col my-4 max-w-prose'>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE1_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE1}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE2_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE2}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE3_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE3}</p>
                </div>
                <div className='my-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 md:mb-24 mt-4'>
                    <Button btnText={pageText.STUDY_BUDDY_BTN} link={'/study-buddies'} bkColor='bg-regional-accent' textColor='text-white' />
                </div>
            </div>

            <div id="link-marketplace" className='flex justify-center bg-primary-super-light bg-marketplaceLongMobile md:bg-marketplaceLongTablet lg:bg-marketplaceLongDesktop bg-cover bg-center bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className={`${lang === "EN" ? 'font-EnglishMarketEN' : 'font-EnglishMarketJA'} font-medium text-mobile-page-header text-center mb-4 p-2 bg-marketplace-accent text-primary-dark `}>{pageText.MARKETPLACE_TITLE}</h2>
            <div className='container flex flex-col items-center mx-auto my-8'>
                <p className='max-w-prose'>{pageText.STUDY_BUDDY_TEXT}</p>
                <div className='flex flex-col my-4 max-w-prose'>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE1_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE1}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE2_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE2}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE3_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE3}</p>
                </div>
                <div className='my-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 md:mb-24 mt-4'>
                    <Button btnText={pageText.STUDY_BUDDY_BTN} link={'/study-buddies'} bkColor='bg-marketplace-accent' textColor='text-primary-dark' />
                </div>
            </div>

            <div id="link-support" className='flex justify-center bg-primary-super-light bg-supportLongMobile md:bg-supportLongTablet lg:bg-supportLongDesktop bg-cover bg-center bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className="font-medium text-mobile-page-header text-center mb-4 md:mb-12 p-2 bg-background text-primary-dark">{pageText.STUDY_SUPPORT_TITLE}</h2>
            <div className='container flex flex-col items-center mx-auto my-8 md:my-12'>
                <p className='max-w-prose'>{pageText.STUDY_BUDDY_TEXT}</p>
                <div className='flex flex-col my-4 max-w-prose'>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE1_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE1}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE2_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE2}</p>
                    <div className='text-primary-dark  mb-2 mt-4'><AwesomeUser /> {pageText.STUDY_BUDDY_TYPE3_TITLE}</div>
                    <p>{pageText.STUDY_BUDDY_TYPE3}</p>
                </div>
                <div className='my-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 md:mb-24 mt-4'>
                    <Button btnText={pageText.STUDY_BUDDY_BTN} link={'/study-buddies'} bkColor='bg-background' textColor='text-primary-dark' />
                </div>
            </div>
        </div>
    )
}

export default About