import * as Yup from 'yup'

const passwordSchema = Yup.object().shape({
    username: Yup.string().required('USERNAME_REQUIRED')
})

export default passwordSchema