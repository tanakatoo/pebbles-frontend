import { LOGIN, LOGOUT, SET_MSG, REMOVE_MSG, SAVE_PROFILE } from "./actionTypes"

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
