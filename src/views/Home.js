import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_PAGE } from "../reducers/actionTypes"

const Home = () => {
    //get the current language
    const lang = useSelector(state => state.langFont.lang)
    const dispatch = useDispatch()
    useEffect(() => {
        //set the current page text
        dispatch({ type: CHANGE_PAGE, lang: lang, page: "home" })
    }, [lang])

    const pageText = useSelector(state => state.pageText.pageText)
    return (
        <div>
            <h1 className="">{pageText.H1}</h1>
            <p >{pageText.BODY} </p>
            <p >テストどうですか？ </p>
        </div>
    )

}

export default Home