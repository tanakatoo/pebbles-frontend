import React, { useEffect } from 'react'
import usePageText from '../hooks/usePageText'

function Marketplace() {
    const [pageText, lang] = usePageText("marketplace")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='py-24 flex flex-col items-center border-t-2 border-gray'>
            <h1 className='text-center font-bold text-mobile-header-1 mb-12'>{pageText.TITLE}</h1>
            <p className='mb-12 text-center'>{pageText.CHECK_BACK}</p>
        </div>
    )
}

export default Marketplace