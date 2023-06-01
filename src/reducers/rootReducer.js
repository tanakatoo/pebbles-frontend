import { combineReducers } from "redux"
import profileReducer from "./profileReducer.js"
import studyBuddyReducer from "./studyBuddyReducer"
import langFontReducer from "./langFontReducer.js"
import pageReducer from "./pageReducer.js"


const rootReducer = combineReducers({
    langFont: langFontReducer,
    pageText: pageReducer,
    profile: profileReducer,
    studyBuddy: studyBuddyReducer
})
export default rootReducer