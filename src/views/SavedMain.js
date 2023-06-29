import React from 'react'
import MainCard from '../components/saved/MainCard'
import usePageText from '../hooks/usePageText'
import PageTitle from '../components/common/PageTitle'
import { useSelector } from 'react-redux'

function SavedMain() {
    const pageText = usePageText('saved')
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div className='px-2 border-t border-t-gray-stroke'>
            <div className='flex flex-col justify-center mb-12'>
                <PageTitle text={pageText.TITLE} extraClasses='my-3' />
                <div className='shrink-0 flex flex-wrap gap-8 mx-8 justify-center
            '>

                    <div className='flex justify-center'>
                        <MainCard img='bg-usersSquare'
                            text={pageText.USERS}
                            link={'users'}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-markeplaceSquare'
                            text={pageText.MARKETPLACE}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-regionalSquare'
                            text={pageText.REGIONAL_RESOURCES}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-regionalParisSquare'
                            text={pageText.REGIONAL_GROUP}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-learningSquare'
                            text={pageText.TOWN_RESOURCES}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-learningGlobeSquare'
                            text={pageText.TOWN_GROUPS}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SavedMain