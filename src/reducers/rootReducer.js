import { combineReducers } from "redux"
import profileReducer from "./profileReducer.js"
import studyBuddyReducer from "./studyBuddyReducer"


const rootReducer = combineReducers({ profile: profileReducer, studyBuddy: studyBuddyReducer })
export default rootReducer