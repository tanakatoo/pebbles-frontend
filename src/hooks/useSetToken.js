import { useDispatch, useSelector } from 'react-redux';
import PebblesApi from "../api/base";
import { actionLogin } from "../reducers/actionCreator"
import React, { useState } from "react"

/**Used to set token in PebblesApi */

const useSetToken = () => {

    //Check at each render if user is logged in or in localStorage
    const [token, setToken] = useState(null)

    if (!token) {
        const token = JSON.parse(window.localStorage.getItem("token"))

        if (token) {
            setToken(token)
            PebblesApi.token = token
        }
    }
    return [token]
}

export default useSetToken