import axios from "axios"
import useLocalStorage from "../hooks/useLocalStorage"
import { LOGIN, LOGOUT, ERROR, RESET_ERROR } from "./actionTypes"
import AuthApi from "../api/auth";


//we always have to reset the error state to null first
function resetError() {
    return ({ type: RESET_ERROR })
}

export function actionLogin(username, password) {

    return async function (dispatch) {
        const res = await AuthApi.login(username, password)
        dispatch(actionLoggedIn(res))
    }
}

function actionLoggedIn(token) {
    return ({ type: LOGIN, token: token })
}

// export function actionRegister(username, password, email) {

//     return async function (dispatch) {
//         try {
//             dispatch(resetError())
//             console.log('finish resetting error')
//             const res = await AuthApi.register(username, password, email)
//             console.log('finish res, it is', res)
//             dispatch(actionLoggedInOrRegistered(res))
//         } catch (e) {
//             dispatch(error(e))
//         }
//     }
// }



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
