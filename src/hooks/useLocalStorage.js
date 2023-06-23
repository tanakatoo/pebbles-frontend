import React, { useEffect, useState } from "react"

/* Checks to see if a state it in localStorage, 
if not then use default value
If state changes, change localStorage

*/

const useLocalStorage = (key, defaultValue = "") => {
    //use localstorage to store token and language

    //set value to initial value
    const [state, setState] = useState(() => {

        let value = JSON.parse(window.localStorage.getItem(key)) || defaultValue
        return value
    })

    //whenever it changes, then reset the localstorage
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    const removeLocalStorage = () => {
        window.localStorage.removeItem(key)
    }
    return [state, setState, removeLocalStorage]
}

export default useLocalStorage