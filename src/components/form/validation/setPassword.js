import * as Yup from 'yup'

const setPasswordSchema = Yup.object().shape({
    password: Yup.string().required('PASSWORD_REQUIRED').min(8, 'PASSWORD_MIN'),
    password_check: Yup.string().required("PASSWORD_CHECK_REQUIRED")
        .oneOf([Yup.ref('password')], 'PASSWORD_CHECK_NOT_SAME ')
})


export default setPasswordSchema