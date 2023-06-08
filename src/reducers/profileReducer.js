import { SAVE_PROFILE, LOGOUT, LOGIN } from "./actionTypes"

const INITIAL_STATE = { token: null }

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_PROFILE:
            //saves the profile 
            return { ...state, profile: action.profile }
        case LOGIN:
            return { ...state, token: action.token, profile: action.profile }
        case LOGOUT:

            return { ...state, token: null }
        default:
            return state

    }
}

export default profileReducer
