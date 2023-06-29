import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Logout from "./views/Logout"
import Register from "./views/Register"
import Profile from "./views/Profile"
// import ProfileOwn from "./views/ProfileOwn not used"
import MessageMain from "./views/MessageMain"
import StudyBuddies from "./views/StudyBuddies"
import ChangePassword from "./views/ChangePassword"
import SetPassword from "./views/SetPassword"
import ProfileEdit from "./views/ProfileEdit"
import Marketplace from "./views/Marketplace"
import Supports from "./views/StudySupport"
import Pricing from "./views/Pricing"
import RegionalCommunity from "./views/RegionalCommunity"
import EnglishCommunity from "./views/EnglishCommunity"
import JapaneseCommunity from "./views/JapaneseCommunity"
import Dashboard from "./views/Dashboard"
import Message from "./views/Message"
import BlockUser from "./views/BlockUser"
import UnblockUser from "./views/UnblockUser"
import ProfileEditMain from "./views/ProfileEditMain"
import ProfileEditMyWay from "./views/ProfileEditMyWay"
import ProfileEditStudyBuddy from "./views/ProfileEditStudyBuddy"
import NotFound404 from "./views/NotFound404"
import SavedMain from "./views/SavedMain"
import SavedUsers from "./views/SavedUsers"

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/study-buddies" element={<StudyBuddies />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/supports" >
                <Route path="" element={<Supports />} />
                <Route path="pricing" element={<Pricing />} />
            </Route>
            <Route path="/community">
                <Route path="regional" element={<RegionalCommunity />} />
                <Route path="japanese" element={<JapaneseCommunity />} />
                <Route path="english" element={<EnglishCommunity />} />
            </Route>

            <Route path="/messages">
                <Route path='' element={<MessageMain />} />
                <Route path=':username' element={<Message />} />
            </Route>

            <Route path="/users">
                {/* <Route path="profile" element={<ProfileOwn />} /> */}
                <Route path="profile/edit" element={<ProfileEditMain />} />
                <Route path="profile/edit/profile" element={<ProfileEdit />} />
                <Route path="profile/edit/myway" element={<ProfileEditMyWay />} />
                <Route path="profile/edit/study-buddy" element={<ProfileEditStudyBuddy />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="block" element={<BlockUser />} />
                <Route path="unblock" element={<UnblockUser />} />
                <Route path="saved" element={<SavedMain />} />
                <Route path="saved/users" element={<SavedUsers />} />
                <Route path=":username" element={<Profile />} />
            </Route>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/reset-password" element={<SetPassword />} />
            <Route path="*" element={<NotFound404 />} />
        </Routes>
    )
}
export default MyRoutes