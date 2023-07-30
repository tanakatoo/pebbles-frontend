import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
    username: Yup.string().required('USERNAME_REQUIRED').max(25, 'USERNAME_MAX')
        .matches(/^\S*$/, 'WHITESPACE'),
    email: Yup.string().email('EMAIL_FORMAT').required("EMAIL_REQUIRED"),
    password: Yup.string().required('PASSWORD_REQUIRED').min(8, 'PASSWORD_MIN').max(20, 'PASSWORD_MAX')
        .matches(/^\S*$/, 'WHITESPACE'),
    password_check: Yup.string().required("PASSWORD_CHECK_REQUIRED")
        .oneOf([Yup.ref('password')], 'PASSWORD_CHECK_NOT_SAME')
})


export default registerSchema