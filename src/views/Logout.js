import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { actionLogout } from '../reducers/actionCreator'
import { useNavigate, redirect, Navigate } from 'react-router-dom'
import Home from './Home'
import FlashMessageContext from '../contexts/FlashMessageContext'

function Logout() {
    const dispatch = useDispatch()
    const [setFlashMessage, setTypeOfMsg] = useContext(FlashMessageContext)
    dispatch(actionLogout())
    const navigate = useNavigate()

    setFlashMessage('LOGOUT')
    navigate('/')
    return (
        <></>
    )


}

export default Logout