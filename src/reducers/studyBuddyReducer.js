import { LOAD_PROFILE } from "./actionTypes"

const INITIAL_STATE = {}

const studyBuddyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            //loads the profile from 
            return { ...state, [action.post.id]: action.post }

        default:
            return state

    }
}

export default studyBuddyReducer