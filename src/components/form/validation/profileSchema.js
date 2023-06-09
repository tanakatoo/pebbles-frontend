import * as Yup from 'yup'


const profileSchema = Yup.object().shape({
    username: Yup.string().required("USERNAME_REQUIRED"),
    email: Yup.string().email('EMAIL_FORMAT').required("EMAIL_REQUIRED")
})

export default profileSchema