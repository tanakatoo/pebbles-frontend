import React from 'react'
import MainCard from '../components/saved/MainCard'
import usePageText from '../hooks/usePageText'
import PageTitle from '../components/common/PageTitle'
import { useSelector } from 'react-redux'

function SavedMain() {
    const [pageText, lang] = usePageText('saved')

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
                        <MainCard img='bg-markeplaceSquare opacity-50 cursor-default'
                            text={pageText.MARKETPLACE}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-regionalSquare opacity-50 cursor-default'
                            text={pageText.REGIONAL_RESOURCES}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-regionalParisSquare opacity-50 cursor-default'
                            text={pageText.REGIONAL_GROUP}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-learningSquare opacity-50 cursor-default'
                            text={pageText.TOWN_RESOURCES}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <MainCard img='bg-learningGlobeSquare opacity-50 cursor-default'
                            text={pageText.TOWN_GROUPS}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SavedMain