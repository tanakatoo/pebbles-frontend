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
import { Formik, Form } from "formik"
import { Button } from "../components/button/Button";
import { RadioButtons } from '../components/form/Fields'
import profileSchema from "../components/form/validation/profileSchema"
import AuthApi from '../api/auth'
import Autocomplete from '../components/form/Autocomplete'

const ProfileOwnEditxy = () => {
    const [pageText] = usePageText("profile")
    const lang = useSelector(state => state.langFont.lang)
    const [errors, setErrors] = useState([])
    const profile = useSelector(state => state.profile.profile)

    const handleSelect = (selected) => {
        console.log('back in edit handling the selection', selected)
        //object with description (name) and place Id 
        //when user submits, we use this to save to DB
    }

    console.log()
    return (
        <div>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <ServerError msg={errors} />}
            <Formik
                initialValues={{
                    username: '',
                    location: ''
                }}
                validationSchema={profileSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false)
                    console.log(values)
                    try {
                        // const res = await AuthApi.changePassword(values.username)
                        // console.log('should be completed', res)


                    } catch (e) {
                        console.log(e)
                        setErrors(e)
                    }
                }}
            >
                <Form>
                    <Autocomplete name="location" onSelect={handleSelect} />
                    <TextInput
                        label={pageText.USERNAME}
                        name="username"
                        type="text"
                        placeholder={pageText.USERNAME}

                    />

                    <Button btnText={pageText.SUBMIT} type="submit" />
                </Form>

            </Formik>

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
        </div>
    )
}

export default ProfileOwnEditxy