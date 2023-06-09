import React from 'react'

const Tab = ({ title, index, isActive, setSelectedTabIndex }) => {
    return (
        <>
            <button className={isActive ? 'border-b-2 border-zinc-950' : ''} type="button" onClick={() => setSelectedTabIndex(index)}>{title}</button >
        </>
    )
}

export default Tab