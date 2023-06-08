import { useDispatch, useSelector } from 'react-redux';
import PebblesApi from "../api/base";
import { actionLogin } from "../reducers/actionCreator"

/**Used to set token in api and redux */

const useSetToken = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.profile)

    //Check at each render if user has a token in their profile or in localStorage
    console.log('user token is', user.token)
    if (!user.token) {
        // const user = JSON.parse(window.localStorage.getItem("user"))
        const token = JSON.parse(window.localStorage.getItem("token"))
        if (token) {
            //log them in
            dispatch(actionLogin(token))
        } else {
            window.localStorage.removeItem('token')
        }
    }
    else {
        PebblesApi.token = user.token
    }
    return [user.token]
}

export default useSetToken