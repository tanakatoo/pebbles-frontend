import { CHANGE_LANG, CHANGE_PAGE } from "./actionTypes"
import language from '../text/language.json';


const INITIAL_STATE = { lang: language.DEFAULT, font: language.FONTS[language.DEFAULT], allFonts: language.FONTS }

const langFontReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            //changes the language and sets the appropraite font and text 
            return { ...state, lang: action.lang, font: language.FONTS[action.lang] }

        default:
            return state

    }
}

export default langFontReducer
