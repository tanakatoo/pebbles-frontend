import React, { useState, useEffect, useRef } from 'react'
import usePageText from '../../hooks/usePageText'
import { AwesomeCaretRight } from '../../styles/Icons'
import ExploreCommunityCard from './ExploreCommunityCard'
import StudyBuddyApi from '../../api/studyBuddy'
import Spinner from '../common/Spinner'
import ServerError from '../form/ServerError'
import NoData from '../common/NoData'
import CustomLink from '../button/CustomLink'
import { v4 as uuid } from 'uuid'


function ExploreCommunity({ type }) {
    const [pageText, lang] = usePageText('dashboard')
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])

    const getStudyBuddies = async () => {
        try {
            setErrors([])
            setDoneGettingData(false);
            const res = await StudyBuddyApi.getStudyBuddies();
            console.log('study budy', res)
            setData(res);
            setDoneGettingData(true);

        } catch (e) {
            if (e instanceof TypeError) {
                //means server is down
                console.error(e)
                setErrors(["UNKNOWN"])
            } else {
                console.error(e)
                setErrors(e)
            }
        }
    }

    const getNothing = () => {

        setDoneGettingData(true);
        setData([])
    }

    useEffect(() => {
        let func
        switch (type) {
            case "studyBuddy":
                func = getStudyBuddies
                break;
            case "marketplace":
                func = getNothing;
                break;
            case "infoCenter":
                func = getNothing;
                break;
            case "languageTown":
                func = getNothing;
                break;
            default:
                func = getNothing;
                break;
        }
        func()
    }, [])


    return (
        <div className='w-full  flex flex-col'>
            <h3 className={`grow px-4 py-2 text-mobile-section-header font-medium}`}>
                {type === "studyBuddy" ? pageText.STUDY_BUDDY
                    : type === "marketplace" ? pageText.MARKETPLACE :
                        type === "infoCenter" ? pageText.INFO_CENTER :
                            type === "languageTown" ? pageText.LANGUAGE_TOWN : ''}</h3>
            {errors.length > 0 && <ServerError msg={errors} />}
            {!data && errors.length === 0 && doneGettingData === false ?
                <div className=' my-24'>
                    <Spinner />
                </div>
                :
                doneGettingData === true && data.length === 0 ?
                    type === "studyBuddy" ?
                        <div data-testid="dashStudyBuddyNoData" className='mx-auto px-2 md:px-4 my-12 max-w-prose'>
                            < NoData msg={pageText.NO_DATA_STUDY_BUDDY} />
                        </div>
                        :
                        <div className='my-12 px-2 md:px-4'>
                            < NoData msg={pageText.NO_DATA} />
                        </div>

                    : <div className='px-2 md:px-4'>

                        <div data-testid="dashStudyBuddyWithData" className='grow flex justify-end mb-2'>
                            <p className=' text-mobile-card-body '>
                                <CustomLink text={pageText.SEE_ALL} path=
                                    {type === "studyBuddy" ? `/study-buddies` :
                                        type === "marketplace" ? `/marketplace` :
                                            type === "infoCenter" ? '/info-center' :
                                                type === "languageTown" ? 'language-town' : ''}
                                /> <AwesomeCaretRight /></p>
                        </div>
                        <div className={`flex flex-wrap gap-2 items-center `}>
                            {data.length === 0 ? <p>under construciton</p>
                                :
                                data.map(d =>
                                    <div key={uuid()} className='flex-1 flex-grow flex justify-center'>
                                        <ExploreCommunityCard data={d} lang={lang} />
                                    </div>)}

                        </div>

                    </div>}
        </div>
    )
}

export default ExploreCommunity