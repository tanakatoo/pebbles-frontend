import { combineReducers } from "redux"
import profileReducer from "./profileReducer.js"
import studyBuddyReducer from "./studyBuddyReducer"
import langFontReducer from "./langFontReducer.js"


const rootReducer = combineReducers({ langFont: langFontReducer, profile: profileReducer, studyBuddy: studyBuddyReducer })
export default rootReducer