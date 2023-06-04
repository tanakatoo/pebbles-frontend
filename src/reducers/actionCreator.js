import axios from "axios"
import useLocalStorage from "../hooks/useLocalStorage"
import { LOGIN, LOGOUT } from "./actionTypes"
import AuthApi from "../api/auth";

export function actionLogin(username, password) {
    return async function (dispatch) {
        const res = await AuthApi.login(username, password)
        dispatch(actionLoggedIn(res))
    }
}

function actionLoggedIn(token) {
    return ({ type: LOGIN, token: token })
}


// export function actionLogout(token) {
//     return async function (dispatch) {
//         const [storageToken, setStorageToken, removeLocalStorage] = useLocalStorage("token")

//         //set the token state to null
//         setStorageToken(null)
//         //remove the token from the storage
//         removeLocalStorage()
//         dispatch(actionLoggedOut())
//     }
// }

// function actionLoggedOut() {
//     return ({ type: LOGOUT })
// }
