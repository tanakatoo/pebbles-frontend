import { CHANGE_PAGE } from "./actionTypes"
import home from '../text/home.json';
import studyBuddy from '../text/studyBuddy.json';
import login from "../text/login.json"
import messages from "../text/message.json"
import register from "../text/register.json"
import password from "../text/changePassword.json"
import setPassword from "../text/password.json"
import profile from "../text/profile.json"

const text = {
    home: home,
    studyBuddy: studyBuddy,
    login: login,
    messages: messages,
    register: register,
    password: password,
    setPassword: setPassword,
    profile: profile
}

const INITIAL_STATE = { pageText: '' }

const pageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CHANGE_PAGE:
            return { ...state, pageText: text[action.page][action.lang] }
        default:
            return state

    }
}

export default pageReducer
