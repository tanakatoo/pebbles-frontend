import * as Yup from 'yup'
import errorText from "../../../text/errors.json"
import { useSelector } from "react-redux"



const loginSchema = Yup.object().shape({
    username: Yup.string().required('USERNAME_REQUIRED'),
    password: Yup.string().required('PASSWORD_REQUIRED').min(8, 'PASSWORD_MIN'),
})

export default loginSchema