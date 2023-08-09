import React from 'react'

function PageTitle({ text, extraClasses = '' }) {
    return (
        <h1 data-testid="pageTitle" className={`${extraClasses} py-8 px-2 text-center text-mobile-header-2 font-bold text-primary-dark`}>{text}</h1>
    )
}

export default PageTitle