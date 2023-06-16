import React, { useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch } from "react-redux";
import ServerError from "../components/form/ServerError";
import loginSchema from "../components/form/validation/loginSchema";
import { actionLogin } from "../reducers/actionCreator";
import { TextInput } from "../components/form/Fields";
import { Formik, Form } from "formik"
import { Button } from "../components/button/Button";
import AuthApi from "../api/auth";
import { useNavigate } from "react-router-dom";
import PebblesApi from "../api/base";


const Login = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const pageText = usePageText("login")
    const INITIAL_DATA = {
        username: '',
        password: ''
    }
    if (PebblesApi.token) {
        //should go to their dashboard
        navigate('/')
    }

    return (
        <>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <ServerError msg={errors} />}
            <Formik
                initialValues={INITIAL_DATA}
                validationSchema={loginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false)
                    setErrors([])
                    try {
                        const res = await AuthApi.login(values.username, values.password)
                        //call dispatch to set token in profileReducer
                        dispatch(actionLogin(res)) //save token and then profile
                        navigate('/')
                    } catch (e) {
                        console.log(e)
                        setErrors(e)
                    }


                }}
            >
                <Form>
                    <TextInput
                        label={pageText.USERNAME}
                        name="username"
                        type="text"
                        placeholder={pageText.USERNAME}
                    />

                    <TextInput
                        label={pageText.PASSWORD}
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <Button btnText={pageText.SUBMIT} type="submit" />
                </Form>

            </Formik>

        </>
    );

};

export default Login;
