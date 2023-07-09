import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actionLogout } from '../reducers/actionCreator'
import { useNavigate, redirect, Navigate } from 'react-router-dom'
import Home from './Home'
// import FlashMessageContext from '../contexts/FlashMessageContext'
import CustomLink from '../components/button/CustomLink'
import usePageText from '../hooks/usePageText'

function Logout() {
    const dispatch = useDispatch()
    const [pageText, lang] = usePageText('login')
    const navigate = useNavigate()
    // const [setFlashMessage, setTypeOfMsg] = useContext(FlashMessageContext)
    useEffect(() => {
        dispatch(actionLogout())

    }, [])



    return (
        <>
            <div className='flex items-center flex-col py-24 border-t-2 border-gray'>
                <p className='mb-8 text-mobile-page-header'>{pageText.LOGOUT}</p>
                <CustomLink text={pageText.LOGOUT_LINK} path='/login' />
            </div>
        </>
    )


}

export default Logout