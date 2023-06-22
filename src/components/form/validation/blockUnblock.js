import * as Yup from 'yup'
import errorText from "../../../text/errors.json"
import { useSelector } from "react-redux"



const blockUnblockSchema = Yup.object().shape({
    username: Yup.string().required('SELECT_USER')

})

export default blockUnblockSchema