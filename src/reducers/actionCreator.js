import axios from "axios"
import useLocalStorage from "../hooks/useLocalStorage"
import { LOGIN, LOGOUT, ERROR, RESET_ERROR, SAVE_PROFILE } from "./actionTypes"
import AuthApi from "../api/auth";



// export function actionLogin(username, password) {

//     return async function (dispatch) {
//         const res = await AuthApi.login(username, password)
//         dispatch(actionLoggedIn(res))
//     }
// }

export function actionLogin(data) {
    window.localStorage.setItem("token", JSON.stringify(data.token))
    return async function (dispatch) {
        dispatch(actionLoggedIn(data))
    }
}

function actionLoggedIn(data) {
    return ({ type: LOGIN, token: data.token, profile: data.user })
}

export function actionSaveProfile(profile) {
    return ({ type: SAVE_PROFILE, profile: profile })
}

export function actionLogout() {
    window.localStorage.removeItem("token")
    return async function (dispatch) {
        dispatch(actionLoggedOut())
    }
}

function actionLoggedOut() {
    return ({ type: LOGOUT })
}
