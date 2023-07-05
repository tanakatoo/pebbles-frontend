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


function ExploreCommunity() {
    const [pageText, lang] = usePageText('dashboard')
    const [doneGettingData, setDoneGettingData] = useState(false)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])

    const getStudyBuddies = async () => {
        try {
            setErrors([])
            setDoneGettingData(false);
            const res = await StudyBuddyApi.getStudyBuddies();
            console.log('got buddies in dashboadr', res)
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

    useEffect(() => {
        getStudyBuddies()
    }, [])
    // const maxScrollWidth = useRef(0);
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const carousel = useRef(null);

    // const movePrev = () => {
    //     if (currentIndex > 0) {
    //         setCurrentIndex((prevState) => prevState - 1);
    //     }
    // };

    // const moveNext = () => {
    //     if (
    //         carousel.current !== null &&
    //         carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    //     ) {
    //         setCurrentIndex((prevState) => prevState + 1);
    //     }
    // };

    // const isDisabled = (direction) => {
    //     if (direction === 'prev') {
    //         return currentIndex <= 0;
    //     }

    //     if (direction === 'next' && carousel.current !== null) {
    //         return (
    //             carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
    //         );
    //     }

    //     return false;
    // };

    // useEffect(() => {
    //     maxScrollWidth.current = carousel.current
    //         ? carousel.current.scrollWidth - carousel.current.offsetWidth
    //         : 0;
    // }, []);

    // useEffect(() => {
    //     if (carousel !== null && carousel.current !== null) {
    //         carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    //     }
    // }, [currentIndex]);

    return (
        <div className='w-full flex flex-col'>
            <h3 className='grow text-mobile-section-header font-medium'>{pageText.STUDY_BUDDY}</h3>
            {errors.length > 0 && <ServerError msg={errors} />}
            {!data && errors.length === 0 && doneGettingData === false ?
                <div className=' my-24'>
                    <Spinner />
                </div>
                :
                doneGettingData === true && data.length === 0 ?
                    <div className='my-12'>
                        < NoData msg={pageText.NO_USERS_MSG} />
                    </div>
                    : <>
                        <div className='grow flex justify-end mb-2'>
                            <p className=' text-mobile-card-body'>
                                <CustomLink text={pageText.SEE_ALL} path='/study-buddies' /> <AwesomeCaretRight /></p>
                        </div>
                        <div className={`flex flex-wrap gap-2 items-center `}>
                            {data.map(d => <div key={uuid()} className='flex-1 flex-grow flex justify-center'><ExploreCommunityCard data={d} lang={lang} /></div>)}

                        </div>
                        {/* <div className="relative overflow-hidden">
                <div className="flex justify-between absolute top left w-full h-full">
                    <button
                        onClick={movePrev}
                        className="hover:bg-primary/75 w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                    // disabled={isDisabled('prev')}
                    >
                        <AwesomeCaretRight />
                        <span className="sr-only">Prev</span>
                    </button>
                    <button
                        onClick={moveNext}
                        className="hover:bg-primary/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                    // disabled={isDisabled('next')}
                    >
                        <AwesomeCaretRight />
                    </button>
                    <div
                        ref={carousel}
                        className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                    >
                        <ExploreCommunityCard />

                    </div>
                </div>
            </div> */}
                    </>}
        </div>
    )
}

export default ExploreCommunity