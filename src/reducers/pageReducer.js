import { CHANGE_PAGE } from "./actionTypes"
import home from '../text/home.json';
import studyBuddy from '../text/studyBuddy.json';
import login from "../text/login.json"
import messages from "../text/message.json"
import register from "../text/register.json"
import changePassword from "../text/changePassword.json"
import password from "../text/password.json"
import profile from "../text/profile.json"
import saved from "../text/savedItems.json"
import dashboard from "../text/dashboard.json"
import about from "../text/about.json"
import contact from "../text/contact.json"
import searchBar from "../text/searchBar.json"
import infoCenter from "../text/infoCenter.json"
import marketplace from "../text/marketplace.json"
import languageTown from '../text/languageTown.json'
import studySupport from "../text/studySupport.json"
import howToSite from "../text/howToSite.json"

const text = {
    home: home,
    studyBuddy: studyBuddy,
    login: login,
    messages: messages,
    register: register,
    changePassword: changePassword,
    password: password,
    profile: profile,
    saved: saved,
    dashboard: dashboard,
    about: about,
    contact: contact,
    searchBar: searchBar,
    infoCenter: infoCenter,
    marketplace: marketplace,
    languageTown: languageTown,
    studySupport: studySupport,
    howToSite: howToSite
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
