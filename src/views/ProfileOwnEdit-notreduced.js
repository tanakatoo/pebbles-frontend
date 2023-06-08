import React, { useEffect, useRef, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useDispatch, useSelector } from 'react-redux'
import { actionSaveProfile } from '../reducers/actionCreator'
import { Link } from 'react-router-dom'
import useSetToken from '../hooks/useSetToken'
import dbText from "../text/db.json"
import usePageText from "../hooks/usePageText";
import { actionLogin } from "../reducers/actionCreator";
import { TextInput } from "../components/form/Fields";
import { useFormik, Form } from "formik"
import { Button } from "../components/button/Button";
import { RadioButtons } from '../components/form/Fields'
import profileSchema from "../components/form/validation/profileSchema"
import AuthApi from '../api/auth'
import Autocomplete from '../components/form/Autocomplete'
import * as Yup from "yup"

const ProfileOwnEdit = () => {
    const [pageText] = usePageText("profile")
    const lang = useSelector(state => state.langFont.lang)
    const [errors, setErrors] = useState([])
    const profile = useSelector(state => state.profile.profile)

    const handleSelect = (selected) => {
        console.log('back in edit handling the selection', selected)
        //object with description (name) and place Id 
        //when user submits, we use this to save to DB
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            location: ''
        },
        validationSchema,
        onSubmit: values => {
            console.log(formik.values)
        }
    })
    //formik also provides us with an error object, with keys like the "name"
    console.log(formik.errors)
    //formik keeps track of the handleBlur in formik.touched and keys are ike "name"
    console.log(formik.touched)
    //to check if field has been visited, use the onBlur
    return (
        <div>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <ServerError msg={errors} />}
            <form onSubmit={formik.handleSubmit}>

                <input type="text" name="username" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username}></input>
                {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
                {/* <Autocomplete name="location" onSelect={handleSelect} /> */}
                <Button btnText={pageText.SUBMIT} type="submit" />
            </form>


            <div>
                {!!profile && <div>
                    {errors.length > 0 && <ServerError msg={errors} />}
                    {profile.gender && < p > Gender is: {dbText.genders[profile.gender][lang]}</p >}

                    {profile ? Object.keys(profile).map(m => <p key={m}>{profile[m]}</p>) : ''}
                    <p>< Link to='/users/hello' > hello profile</Link ></p>
                    <Link to='/'>Get an address from api</Link>
                </div>
                }
            </div >
        </div >
    )
}

export default ProfileOwnEdit