import * as Yup from 'yup'


const registerSchema = Yup.object().shape({
    username: Yup.string().required('Required username'),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required('Required password').min(8, 'Password must be 8 characters or more.'),
    password_check: Yup.string().required("Please input password again")
        .oneOf([Yup.ref('password')], 'Passwords must match')
})

export default registerSchema