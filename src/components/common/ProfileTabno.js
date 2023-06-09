import React, { useState } from 'react'
import Tab from '../tab/Tab'
import TabPane from '../tab/TabPane'

function ProfileTabx(props) {

    const tabs = ['Profile', 'Habits', 'Study Buddy']
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    return (
        <div>
            <Tab setSelectedTabIndex={setSelectedTabIndex} title={tabs[0]} isActive={activeTab == tabs[0]} index={0} />
            <TabPane>
                {props.children}
            </TabPane>

        </div>
    )
}

export default ProfileTabx