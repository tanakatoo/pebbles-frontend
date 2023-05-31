import { LOAD_PROFILE, LOGOUT } from "./actionTypes"

const INITIAL_STATE = {}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            //loads the profile from 
            return { ...state, [action.post.id]: action.post }
        case LOGOUT:
            //remove from localstorage and state
            localStorage.clear()
            return {}
        default:
            return state

    }
}

export default profileReducer
