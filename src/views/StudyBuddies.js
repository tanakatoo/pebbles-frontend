import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_PAGE } from "../reducers/actionTypes"
import usePageText from "../hooks/usePageText"

const StudyBuddies = () => {
    const langFont = useSelector(state => state.langFont)
    const [pageText] = usePageText("studyBuddy")

    return (
        <div className="StudyBuddy">
            <h1 className={`${langFont.lang == 'EN' ? 'font-StudyBuddyEN' : 'font-StudyBuddyJA'} `}>{pageText.H1}</h1>
            <p>{pageText.BODY}</p>
        </div>
    )
}

export default StudyBuddies