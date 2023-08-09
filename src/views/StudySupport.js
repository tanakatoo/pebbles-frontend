import React, { useEffect } from 'react'
import usePageText from '../hooks/usePageText'

function StudySupport() {
    const [pageText, lang] = usePageText("studySupport")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='py-24 flex flex-col items-center'>
            <h1 className='text-center font-bold text-mobile-header-1 mb-12'>{pageText.TITLE}</h1>
            <p className='mb-12 text-center'>{pageText.CHECK_BACK}</p>
        </div>
    )
}
export default StudySupport