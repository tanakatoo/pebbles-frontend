import * as Yup from 'yup'


const loginSchema = Yup.object().shape({
    username: Yup.string().required('USERNAME_REQUIRED'),
    password: Yup.string().required('PASSWORD_REQUIRED').min(3, 'PASSWORD_MIN'),
})

export default loginSchema