import axios from "axios"
import { CHANGE_LANG } from "./actionTypes";
import useLocalStorage from './hooks/useLocalStorage';

export function actionChangeLang(lang) {
    return function (dispatch) {
        dispatch(actionChangedLang(lang))

    }
}

function actionChangedLang(lang) {
    return ({ type: CHANGE_LANG, lang: lang })
}
