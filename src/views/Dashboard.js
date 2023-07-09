import React from 'react'
import CTA from '../components/common/CTA'
import usePageText from "../hooks/usePageText"
import { useSelector } from 'react-redux'
import StatisticsCard from '../components/dashboard/StatisticsCard'
import { AwesomeCheck } from '../styles/Icons'
import { Button } from '../components/button/Button'
import ExploreCommunity from '../components/dashboard/ExploreCommunity'


function Dashboard() {
    const [pageText, lang] = usePageText('dashboard')
    const profile = useSelector(state => state.profile.profile)
    console.log('in dashboa')
    return (
        // <Protected>
        <div>
            {lang === "JA"
                ?
                profile.premium_join_date && !profile.premium_end_date ?
                    <>
                        <CTA msg={pageText.CTA_MSG_PREMIUM} msgBtn={pageText.CTA_MSG_BTN_PREMIUM} btnLink={pageText.CTA_MSG_BTN_LINK_PREMIUM} />
                    </>
                    :
                    profile.free_trial_start_date ?
                        <>
                            <CTA msg={pageText.CTA_MSG_NO_PREMIUM} msgBtn={pageText.CTA_MSG_BTN_NO_PREMIUM} btnLink={pageText.CTA_MSG_BTN_LINK_NO_PREMIUM} />
                        </>

                        :
                        <>
                            <CTA msg={pageText.CTA_MSG_NO_TRIAL} msgBtn={pageText.CTA_MSG_BTN_NO_TRIAL} btnLink={pageText.CTA_MSG_BTN_LINK_NO_TRIAL} />



                            <div className='mx-4'>
                                <div className='flex flex-col items-center justify-center mb-8 md:mb-12 gap-2'>
                                    <h2 className="text-primary-dark font-medium text-mobile-page-header text-center">{pageText.STAT}</h2>
                                    <div className='flex flex-row flex-wrap items-center my-4 gap-4 justify-around grow container w-full'>
                                        <StatisticsCard numUsers={pageText.STAT_NUM_LEVEL_UP} text={pageText.STAT_LEVEL_UP} viaPercent='via-30%' />
                                        <StatisticsCard numUsers={pageText.STAT_NUM_UPGRADED} text={pageText.STAT_UPGRADED} viaPercent={'via-60%'} />
                                        <StatisticsCard numUsers={pageText.STAT_NUM_STARTED} text={pageText.STAT_STARTED} viaPercent={'via-20%'} />
                                    </div>
                                </div>
                            </div>
                            {profile.premium_join_date && !profile.premium_end_date ?
                                null :
                                profile.free_trial_start_date ?
                                    <div className='flex flex-col '>
                                        <h2 className="bg-secondary py-2 text-white font-medium text-mobile-page-header text-center">{pageText.PREMIUM_BENEFITS}</h2>
                                        <div className='bg-secondary-background p-4 flex flex-col items-center'>
                                            <p className='mb-2 md:max-w-[500px]'>{pageText.PREMIUM_BLURB}</p>

                                            <ol>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK1}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK2}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK3}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK4}</span></li>
                                            </ol>
                                        </div>
                                        <Button btnText={pageText.PREMIUM_BTN} />
                                    </div >
                                    :
                                    <div className='flex flex-col bg-secondary-background pb-8 md:pb-12'>
                                        <h2 className="bg-secondary py-2 text-white font-medium text-mobile-page-header px-4 md:text-center">{pageText.TRIAL_BENEFITS}</h2>
                                        <div className='p-4  flex flex-col items-center justify-center'>
                                            <p className='mb-4 md:max-w-[800px]'>{pageText.TRIAL_BLURB}</p>
                                            <ol className=''>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK1}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK2}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK3}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK4}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK5}</span></li>
                                            </ol>
                                        </div>
                                        <div className='flex justify-center mt-6'>
                                            <Button btnText={pageText.TRIAL_BTN} />
                                        </div>
                                    </div >

                            }
                        </>
                :
                <>
                    <CTA msg={pageText.CTA_MSG} msgBtn={pageText.CTA_MSG_BTN} btnLink={pageText.CTA_MSG_BTN_LINK} />
                </>

            }

            <h2 className="py-2 my-8 text-primary-dark font-medium text-mobile-page-header px-4 text-center ">{pageText.EXPLORE_COMMUNITY}</h2>
            <div className='flex flex-col pt-2 pb-12 bg-primary-super-light'>
                <div className='flex items-center justify-center flex-1'>
                    <ExploreCommunity type="studyBuddy" />
                </div>
            </div >

            <div className='flex flex-col pt-2 pb-12 bg-regional-background'>
                <div className='flex items-center justify-center flex-1'>
                    <ExploreCommunity type="infoCenter" />
                </div>
            </div >
            <div className='flex flex-col pt-2 pb-12 bg-accent-very-light'>
                <div className='flex items-center justify-center flex-1'>
                    <ExploreCommunity type="languageTown" />
                </div>
            </div >
            <div className='flex flex-col pt-2 pb-12 bg-marketplace-background'>
                <div className='flex items-center justify-center flex-1'>
                    <ExploreCommunity type="marketplace" />
                </div>
            </div >
        </div >
        // </Protected>
    )
}

export default Dashboard