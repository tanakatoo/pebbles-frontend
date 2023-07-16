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
import Pricing from "./views/Pricing"
import InfoCenter from "./views/InfoCenter"
import LanguageTown from "./views/LanguageTown"

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
import ChangeAvatar from "./views/ChangeAvatar"
import About from "./views/About"
import Unauthorized from "./views/Unauthorized"
import Protected from "./components/common/Protected"
import Contact from "./views/Contact"
import Search from "./views/Search"
import StudySupport from "./views/StudySupport"
import HowToSite from "./views/HowToSite"

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/faq" element={<HowToSite />} />
            <Route path="/study-buddies" element={<StudyBuddies />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/study-support" element={<StudySupport />} />
            <Route path="/study-support/pricing" element={<Pricing />} />
            <Route path="/info-center" element={<InfoCenter />} />
            <Route path="/language-town" element={<LanguageTown />} />
            <Route path='/messages' element={<Protected />}>
                <Route path="/messages">
                    <Route path='' element={<MessageMain />} />
                    <Route path=':username' element={<Message />} />
                </Route>
            </Route>
            <Route path='' element={<Protected />}>
                <Route path="/users/profile/edit" element={<ProfileEditMain />} />
                <Route path="/users/profile/edit/avatar" element={<ChangeAvatar />} />
                <Route path="/users/profile/edit/profile" element={<ProfileEdit />} />
                <Route path="/users/profile/edit/myway" element={<ProfileEditMyWay />} />
                <Route path="/users/profile/edit/study-buddy" element={<ProfileEditStudyBuddy />} />
                <Route path="/users/dashboard" element={<Dashboard />} />
                <Route path="/users/block" element={<BlockUser />} />
                <Route path="/users/unblock" element={<UnblockUser />} />
                <Route path="/users/saved" element={<SavedMain />} />
                <Route path="/users/saved/users" element={<SavedUsers />} />
            </Route>
            <Route path="/users/:username" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/reset-password" element={<SetPassword />} />
            <Route path="/search" element={<Search />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound404 />} />
        </Routes >
    )
}
export default MyRoutes