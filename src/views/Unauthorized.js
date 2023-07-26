import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePageText from '../hooks/usePageText'
import { Link } from 'react-router-dom'
import CustomLink from '../components/button/CustomLink'
import { useSelector } from 'react-redux'

function Unauthorized() {

    console.log('are we logged in?', useSelector(state => state.profile))
    const [pageText, lang] = usePageText('home')

    return (
        <div className='Unauthorized mx-2 flex items-center flex-col my-12'>
            <p className='text-center mb-6'>{pageText.UNAUTHORIZED}</p>
            <p><CustomLink path='/' text={pageText.OOPS_GO_HOME} /></p>
        </div>
    )
}

export default Unauthorized