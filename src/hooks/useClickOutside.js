import React, { useEffect, useRef } from 'react'

function useClickOutside(handleClickOutside) {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            //only if anything outside gets clicked, not the button itself
            if (ref.current && !ref.current.contains(e.target)) {
                handleClickOutside()
            }

        }
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [ref])

    return ref
}

export default useClickOutside