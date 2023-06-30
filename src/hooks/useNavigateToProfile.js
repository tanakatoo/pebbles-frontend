
import { useNavigate, useLocation } from "react-router-dom"

const useNavigateToProfile = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const goToProfileOnClick = (username) => {
        navigate(`/users/${username}`, {
            state: {
                fromLocation: location.pathname
            }
        })
    }
    return goToProfileOnClick
}

export default useNavigateToProfile