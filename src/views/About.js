import React, { useEffect, useState } from 'react'
import usePageText from '../hooks/usePageText'
import { AwesomeCheck, AwesomeArrowRightLong, AwesomeUser, AwesomeArrowUpLong, AwesomeQuestion, AwesomeGift, AwesomeStar } from '../styles/Icons'
import CustomLink from '../components/button/CustomLink'
import { HashLink } from 'react-router-hash-link';
import { Button } from '../components/button/Button';

function About() {
    const [pageText, lang] = usePageText('about')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
                    <div>
                        <div className='text-success my-2'>
                            <span className='text-green'><AwesomeCheck /> </span>
                            {pageText.BEGINNINGS3}
                        </div>
                        <div className='text-success my-2'>
                            <span className='text-green'><AwesomeCheck /> </span>
                            {pageText.BEGINNINGS4}</div>
                        <div className='text-success my-2'>
                            <span className='text-green'><AwesomeCheck /> </span>
                            {pageText.BEGINNINGS5}</div>
                        <div className='text-success my-2'>
                            <span className='text-green'><AwesomeCheck /> </span>
                            {pageText.BEGINNINGS6}</div>
                    </div>
                    <p className='my-4  max-w-prose'>{pageText.BEGINNINGS7}</p>
                </div>
            </div >
            <h2 id="top" className="font-medium text-mobile-page-header text-center p-2 mt-12 md:mt-24 bg-primary-dark text-white">{pageText.COMMUNITIES}</h2>
            <div className='flex flex-col pt-4 md:pt-8 pb-12 md:pb-24 px-2 bg-primary-super-light '>
                <div className='container mx-auto flex flex-col items-center'>
                    <p className='mb-2 text-center'>{pageText.EXPLORE}</p>
                    {lang === "JA" ?
                        <div className='text-center my-1' >
                            <div className='group'>
                                <HashLink to="#link-support" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                    {pageText.STUDY_SUPPORT_TITLE}
                                    <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                        <AwesomeArrowRightLong />
                                    </span>
                                </HashLink>
                            </div>
                        </div>
                        : ''
                    }
                    <div className='text-center my-1 ' >
                        <div className='group'>
                            <HashLink to="#link-studyBuddy" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                {pageText.STUDY_BUDDY_TITLE}
                                <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                    <AwesomeArrowRightLong />
                                </span>
                            </HashLink>
                        </div>
                    </div>
                    <div className='text-center my-1 '>
                        <div className='group'>
                            <HashLink to="#link-town" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                {pageText.TOWN_TITLE}
                                <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                    <AwesomeArrowRightLong />
                                </span>
                            </HashLink>
                        </div>
                    </div>
                    <div className='text-center my-1 '>
                        <div className='group'>
                            <HashLink to="#link-info" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                {pageText.INFO_CENTER_TITLE}
                                <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                    <AwesomeArrowRightLong />
                                </span>
                            </HashLink>
                        </div>
                    </div>
                    <div className='text-center my-1 '>
                        <div className='group'>
                            <HashLink to="#link-marketplace" className=' group-hover:underline group-hover:underline-offset-4 group-hover:text-gray-text'>
                                {pageText.MARKETPLACE_TITLE}
                                <span className='inline-block group-hover:translate-x-2 group-hover:text-gray-text transition text-black ps-1'>
                                    <AwesomeArrowRightLong />
                                </span>
                            </HashLink>
                        </div>
                    </div>

                </div>
            </div >
            <div id="link-support" className='flex justify-center bg-primary-super-light bg-supportLongMobile md:bg-supportLongTablet lg:bg-supportLongDesktop bg-cover bg-center bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className="font-medium text-mobile-page-header text-center mb-4 md:mb-12 p-2 bg-background text-primary-dark">{pageText.STUDY_SUPPORT_TITLE}</h2>
            <div className='container flex flex-col items-center mx-auto my-8 md:my-12'>
                <p className='max-w-prose'>{pageText.SUPPORT1}</p>
                <div className='flex flex-col my-4 max-w-prose'>
                    <div className='text-primary-dark  mb-2 mt-4'>
                        <span className='text-star'><AwesomeStar /> </span>
                        {pageText.IMPROVE1_TITLE}</div>
                    <p>{pageText.IMPROVE1}</p>
                    <div className='text-primary-dark  mb-2 mt-4'>
                        <span className='text-star'><AwesomeStar /> </span>
                        {pageText.IMPROVE2_TITLE}</div>
                    <p>{pageText.IMPROVE2}</p>
                    <div className='text-primary-dark  mb-2 mt-4'>
                        <span className='text-star'><AwesomeStar /> </span>
                        {pageText.IMPROVE3_TITLE}</div>
                    <p>{pageText.IMPROVE3}</p>
                    <div className='text-primary-dark mb-2 mt-4'>
                        <span className='text-star'><AwesomeStar /> </span>
                        {pageText.IMPROVE4_TITLE}</div>
                    <p>{pageText.IMPROVE4}</p>
                    <div className='text-primary-dark  mb-2 mt-4'>
                        <span className='text-star'><AwesomeStar /> </span>
                        {pageText.IMPROVE5_TITLE}</div>
                    <p>{pageText.IMPROVE5}</p>

                </div>
                <p className='max-w-prose mt-4'>{pageText.SUPPORT_ENDING}</p>
                <div className='my-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 md:mb-24 mt-4'>
                    <Button btnText={pageText.SUPPORT_BTN} link={'/study-buddies'} bkColor='bg-background' textColor='text-primary-dark' />
                </div>
            </div>
            <div id="link-studyBuddy" className='flex justify-center bg-primary-super-light bg-studyBuddyLongMobile md:bg-studyBuddyLongTablet lg:bg-studyBuddyLongDesktop bg-cover bg-bottom bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className={`font-bold text-mobile-page-header text-center mb-4 md:mb-12 p-2 bg-study-buddy-accent text-primary-dark
            ${lang === "EN" ? 'font-StudyBuddyEN' : "font-StudyBuddyJA"}`}>{pageText.STUDY_BUDDY_TITLE}</h2>
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
                <p className='max-w-prose'>{pageText.INFO1}</p>
                <div className='flex flex-col my-4 max-w-prose'>
                    <div className='text-primary-dark  mt-4'>
                        <span>{pageText.INFO_Q1}</span>
                        <span className='text-secondary'><AwesomeQuestion /></span>
                    </div>
                    <div className='text-primary-dark  mt-4'>
                        <span>{pageText.INFO_Q2}</span>
                        <span className='text-secondary'><AwesomeQuestion /></span>
                    </div>
                    <div className='text-primary-dark  mt-4'>
                        <span>{pageText.INFO_Q3}</span>
                        <span className='text-secondary'><AwesomeQuestion /></span>
                    </div>
                    <div className='text-primary-dark mb-4 mt-4'>
                        <span>{pageText.INFO_Q4}</span>
                        <span className='text-secondary'><AwesomeQuestion /></span>
                    </div>
                </div>
                <p className='max-w-prose mb-4'>{pageText.INFO2}</p>
                <p className='max-w-prose'>{pageText.INFO3}</p>
                <div className='my-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 md:mb-24 mt-4'>
                    <Button btnText={pageText.INFO_BTN} link={'/study-buddies'} bkColor='bg-regional-accent' textColor='text-white' />
                </div>
            </div>

            <div id="link-marketplace" className='flex justify-center bg-primary-super-light bg-marketplaceLongMobile md:bg-marketplaceLongTablet lg:bg-marketplaceLongDesktop bg-cover bg-center bg-no-repeat relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]' >
            </div>
            <h2 className={`${lang === "EN" ? 'font-EnglishMarketEN' : 'font-EnglishMarketJA'} font-bold text-mobile-page-header text-center mb-4 p-2 bg-marketplace-accent text-primary-dark `}>{pageText.MARKETPLACE_TITLE}</h2>
            <div className='container flex flex-col items-center mx-auto my-8'>
                <p className='max-w-prose'>{pageText.MARKET1}</p>
                <div className='flex flex-col my-4 max-w-prose'>
                    <div className='text-primary-dark  mb-4 mt-4'>
                        <span className='text-primary'><AwesomeGift /> </span>
                        <span>{pageText.ITEM1}</span>
                    </div>
                    <div className='text-primary-dark  mb-4'>
                        <span className='text-primary'><AwesomeGift /> </span>
                        <span>{pageText.ITEM2}</span>

                    </div>
                    <div className='text-primary-dark  mb-4'>
                        <span className='text-primary'><AwesomeGift /> </span>
                        <span>{pageText.ITEM3}</span>

                    </div>
                    <div className='text-primary-dark  mb-4'>
                        <span className='text-primary'><AwesomeGift /> </span>
                        <span>{pageText.ITEM4}</span>

                    </div>
                    <div className='text-primary-dark  mb-4'>
                        <span className='text-primary'><AwesomeGift /> </span>
                        <span>{pageText.ITEM5}</span>

                    </div>
                    <div className='text-primary-dark  mb-4'>
                        <span className='text-primary'><AwesomeGift /> </span>
                        <span>{pageText.ITEM6}</span>

                    </div>
                </div>
                <div className='mb-4 flex w-full max-w-prose justify-end' ><HashLink to="#top"><AwesomeArrowUpLong /><span className='text-mobile-label-1 ms-1'>{pageText.TOP}</span></HashLink></div>
                <div className='mb-12 mt-4'>
                    <Button btnText={pageText.MARKET_BTN} link={'/study-buddies'} bkColor='bg-marketplace-accent' textColor='text-primary-dark' />
                </div>
            </div>


        </div >
    )
}

export default About