import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Register from "./views/Register"
import StudyBuddies from "./views/StudyBuddies"

const MyRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/study-buddies" element={<StudyBuddies />} />
            <Route path="*" element={<Home />} />
        </Routes>
    )
}
export default MyRoutes