import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePageText from '../hooks/usePageText'
import { Link } from 'react-router-dom'
import CustomLink from '../components/button/CustomLink'

function Unauthorized() {
    const [pageText, lang] = usePageText('home')


    return (
        <div className='flex items-center flex-col my-12'>
            <p className='mb-6'>{pageText.UNAUTHORIZED}</p>
            <p><CustomLink path='/' text={pageText.OOPS_GO_HOME} /></p>
        </div>
    )
}

export default Unauthorized