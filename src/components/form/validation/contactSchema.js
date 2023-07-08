import * as Yup from 'yup'

const contactSchema = Yup.object().shape({
    name: Yup.string().required('NAME_REQUIRED'),
    email: Yup.string().email('EMAIL_FORMAT').required("EMAIL_REQUIRED"),
    msg: Yup.string().required('MESSAGE_REQ')
})


export default contactSchema