import { LOAD_PROFILE, LOGOUT, LOGIN, ERROR } from "./actionTypes"

const INITIAL_STATE = {}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            //loads the profile 
            return action.profile
        case LOGIN:
            window.localStorage.setItem("token", action.token)
            return { ...state, token: action.token }
        case LOGOUT:
            window.localStorage.removeItem("token")
            return { ...state, token: null }
        default:
            return state

    }
}

export default profileReducer
