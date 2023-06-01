import { LOAD_PROFILE, LOGOUT, LOGIN } from "./actionTypes"

const INITIAL_STATE = {}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            //loads the profile 
            return action.profile
        case LOGIN:
            console.log('token in reducer', action.token)
            //sets id in local storage and this state

            window.localStorage.setItem('token', action.token)
        case LOGOUT:
            //remove from localstorage and state
            window.localStorage.removeItem('token')
            return {}
        default:
            return state

    }
}

export default profileReducer
