import React from 'react'
import CTA from '../components/common/CTA'
import usePageText from "../hooks/usePageText"
import { useSelector } from 'react-redux'
import StatisticsCard from '../components/dashboard/StatisticsCard'
import { AwesomeSquareCheck, AwesomeCheck } from '../styles/Icons'

function Dashboard() {
    const [pageText, lang] = usePageText('dashboard')
    const profile = useSelector(state => state.profile.profile)

    return (
        <div>
            {lang === "JA" || lang === "EN"
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
                                <div className='flex flex-col items-center justify-center mb-8 gap-2'>
                                    <h2 className="text-primary-dark font-medium text-mobile-page-header text-center">{pageText.STAT}</h2>
                                    <div className='flex flex-row flex-wrap items-center my-4 gap-4 justify-around grow container w-full'>
                                        <StatisticsCard numUsers={pageText.STAT_NUM_LEVEL_UP} text={pageText.STAT_LEVEL_UP} viaPercent='via-30%' />
                                        <StatisticsCard numUsers={pageText.STAT_NUM_UPGRADED} text={pageText.STAT_UPGRADED} viaPercent={'via-60%'} />
                                        <StatisticsCard numUsers={pageText.STAT_NUM_STARTED} text={pageText.STAT_STARTED} viaPercent={'via-85%'} />
                                    </div>
                                </div>
                            </div>
                            {profile.premium_join_date && !profile.premium_end_date ?
                                null :
                                profile.free_trial_start_date ?
                                    <div className='flex flex-col '>
                                        <h2 className="bg-secondary py-2 text-white font-medium text-mobile-page-header text-center">{pageText.PREMIUM_BENEFITS}</h2>
                                        <div className='bg-secondary-background p-4 flex flex-col items-center'>
                                            <p className='mb-2'>{pageText.PREMIUM_BLURB}</p>
                                            <ol>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK1}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK2}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK3}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.CHECK4}</span></li>
                                            </ol>
                                        </div>
                                    </div >
                                    :
                                    <div className='flex flex-col '>
                                        <h2 className="bg-secondary py-2 text-white font-medium text-mobile-page-header px-4 md:text-center">{pageText.TRIAL_BENEFITS}</h2>
                                        <div className='bg-secondary-background p-4 flex flex-col items-center justify-center'>
                                            <p className='mb-2'>{pageText.TRIAL_BLURB}</p>
                                            <ol>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK1}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK2}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK3}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK4}</span></li>
                                                <li className='py-2 md:py-1'><span className='text-success me-2'><AwesomeCheck /></span> <span className=''>{pageText.TRIAL_CHECK5}</span></li>
                                            </ol>
                                        </div>
                                    </div >
                            }
                        </>
                :
                <>
                    <CTA msg={pageText.CTA_MSG} msgBtn={pageText.CTA_MSG_BTN} btnLink={pageText.CTA_MSG_BTN_LINK} />
                </>

            }
        </div >
    )
}

export default Dashboard