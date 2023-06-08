import * as Yup from 'yup'


const profileSchema = Yup.object().shape({
    username: Yup.string().required("USERNAME_REQUIRED")
})

export default profileSchema