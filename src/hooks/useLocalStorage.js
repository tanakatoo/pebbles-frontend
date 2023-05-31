import React, { useEffect, useState } from "react"

/* Checks to see if a state it in localStorage, 
if not then use default value
If state changes, change localStorage

*/

const useLocalStorage = (key, defaultValue) => {

    const [state, setState] = useState(() => {
        let value = window.localStorage.getItem(key) || JSON.stringify(defaultValue)
        return value
    })
    useEffect(() => {
        window.localStorage.setItem(key, state)
    }, [state])
    return [state, setState]
}

export default useLocalStorage