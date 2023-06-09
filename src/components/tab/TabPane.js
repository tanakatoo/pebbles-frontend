import React from 'react'

function TabPane(props) {
    console.log('tab pane', props)
    return (
        <div>{props.children}</div>
    )
}

export default TabPane