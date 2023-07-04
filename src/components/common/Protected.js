import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useContext } from 'react';
// import FlashMessageContext from "../../contexts/FlashMessageContext"

const Protected = ({ children }) => {
    const user = useSelector((state) => state.profile.token);
    let location = useLocation();
    // const [setFlashMessage, setTypeOfMessage] = useContext(FlashMessageContext)

    //have to use useeffect because the error "cannot update App.js"
    // useEffect(() => {
    //     if (!user) {
    //         setFlashMessage('UNAUTHORIZED')
    //         setTypeOfMessage('error')
    //     }
    // }, [])


    if (!user) {
        return <Navigate to="/system-message" state={{ from: location.pathname }} replace />
    }
    return children

};

export default Protected;