import { CHANGE_LANG } from "./actionTypes"
import language from '../text/language.json';
import home from '../text/home.json';

console.log('langauge file', language.DEFAULT)
const INITIAL_STATE = { lang: language.DEFAULT, font: language.FONTS[language.DEFAULT] }

const langFontReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            //loads the profile from 
            return { lang: action.lang, font: language.FONTS[action.lang] }
        default:
            return state

    }
}

export default langFontReducer
