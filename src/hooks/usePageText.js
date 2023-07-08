import React, { useState, useEffect } from "react"
import { CHANGE_PAGE } from "../reducers/actionTypes"
import { useDispatch, useSelector } from "react-redux"

const usePageText = (page) => {

    const langFont = useSelector(state => state.langFont)
    const dispatch = useDispatch()

    useEffect(() => {
        //set the current page text
        dispatch({ type: CHANGE_PAGE, lang: langFont.lang, page: page })
    }, [langFont.lang])

    const pageText = useSelector(state => state.pageText.pageText)
    return [pageText, langFont.lang]
}

export default usePageText