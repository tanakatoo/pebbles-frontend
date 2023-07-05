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
    // const [setFlashMessage, setTypeOfMsg] = useContext(FlashMessageContext)
    useEffect(() => {
        dispatch(actionLogout())
    }, [])



    return (
        <>
            <div className='flex items-center flex-col my-12'>
                <p className='mb-8'>{pageText.LOGOUT}</p>
                <CustomLink text={pageText.LOGOUT_LINK} path='/login' />
            </div>
        </>
    )


}

export default Logout