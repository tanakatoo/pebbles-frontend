import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// import FlashMessageContext from "../../contexts/FlashMessageContext"

const Protected = ({ children, redirectPath = "/unauthorized", roleIs = null }) => {

    const user = useSelector((state) => state.profile);
    let location = useLocation();
    // const [setFlashMessage, setTypeOfMessage] = useContext(FlashMessageContext)

    //have to use useeffect because the error "cannot update App.js"
    // useEffect(() => {
    //     if (!user) {
    //         setFlashMessage('UNAUTHORIZED')
    //         setTypeOfMessage('error')
    //     }
    // }, [])


    if (!user.token) {
        return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
    }

    if (roleIs) {
        if ((user.profile && user.profile.role) !== roleIs) {
            return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
        }
    }
    return children ? children : <Outlet />

};

export default Protected;