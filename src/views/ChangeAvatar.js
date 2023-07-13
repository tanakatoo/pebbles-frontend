import React, { useEffect, createRef, useRef, useState } from 'react';

import usePageText from '../hooks/usePageText'



function ChangeAvatar() {
    const [pageText, lang] = usePageText("profile")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className='py-24 flex flex-col items-center border-t-2 border-gray'>
            <h1 className='text-center font-bold text-mobile-header-1 mb-12'>{pageText.CHANGE_AVATAR_TITLE}</h1>
            <p className='mb-12 text-center max-w-prose'>{pageText.CHANGE_AVATAR_MSG}</p>
        </div>

    );
}

export default ChangeAvatar