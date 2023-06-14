import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Register from "./views/Register"
import Profile from "./views/Profile"
import ProfileOwn from "./views/ProfileOwn"

import StudyBuddies from "./views/StudyBuddies"
import ChangePassword from "./views/ChangePassword"
import SetPassword from "./views/SetPassword"
import ProfileEdit from "./views/ProfileEdit"

const MyRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:lang/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/study-buddies" element={<StudyBuddies />} />
            <Route path="/users">
                <Route path="profile" element={<ProfileOwn />} />
                <Route path="profile/edit" element={<ProfileEdit />} />
                <Route path=":username" element={<Profile />} />
            </Route>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/reset-password" element={<SetPassword />} />
            <Route path="*" element={<Home />} />
        </Routes>
    )
}
export default MyRoutes