import { CHANGE_LANG, CHANGE_PAGE } from "./actionTypes"
import language from '../text/language.json';

console.log('navigator', navigator.language)
let initial_lang = "JA"
if (/^en\b/.test(navigator.language)) {
    console.log('ther eis en in the lang')
    initial_lang = "EN"
}

const INITIAL_STATE = { lang: initial_lang, font: language.FONTS[initial_lang], allFonts: language.FONTS }

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
