import React, { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_PAGE } from "../reducers/actionTypes"
import usePageText from "../hooks/usePageText"
import { useNavigate, useLocation } from "react-router-dom"



const StudyBuddies = () => {
    const langFont = useSelector(state => state.langFont)
    const pageText = usePageText("studyBuddy")

    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {

        navigate('/users/ktoo', {
            state: {
                fromLocation: location.pathname
            }
        })
    }, [])

    return (
        <div className="StudyBuddy">
            <h1 className={`${langFont.lang == 'EN' ? 'font-StudyBuddyEN' : 'font-StudyBuddyJA'} `}>{pageText.H1}</h1>
            <p>{pageText.BODY}</p>
        </div>
    )
}

export default StudyBuddies