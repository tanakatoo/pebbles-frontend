import * as Yup from 'yup'


const loginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required').min(3, 'Password must be 8 characters or more.'),
})

export default loginSchema