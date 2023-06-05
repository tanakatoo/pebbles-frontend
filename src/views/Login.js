import React, { useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch } from "react-redux";
import { LOGIN } from "../reducers/actionTypes";
import InputError from "../components/form/InputError";
import loginSchema from "../components/form/validation/loginSchema";
import { actionLogin } from "../reducers/actionCreator";
import { TextInput } from "../components/form/Fields";
import { Formik, Form } from "formik"
import { Button } from "../components/button/Button";
import AuthApi from "../api/auth";

const Login = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    const [pageText] = usePageText("login")
    const INITIAL_DATA = {
        username: '',
        password: ''
    }


    return (
        <>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <InputError msg={errors} />}
            <Formik
                initialValues={INITIAL_DATA}
                validationSchema={loginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false)
                    try {
                        const res = await AuthApi.login(values.username, values.password)
                        //call dispatch to set token in profileReducer
                        dispatch({ type: LOGIN, token: res })

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
