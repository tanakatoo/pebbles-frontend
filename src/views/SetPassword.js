import React, { useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch, useSelector } from "react-redux";
import AuthApi from "../api/auth";
import { LOGIN } from "../reducers/actionTypes";
import ServerError from "../components/form/ServerError";
import { Formik, Form, ErrorMessage } from "formik"
import setPasswordSchema from "../components/form/validation/setPassword";
import { TextInput } from "../components/form/Fields";
import { Button } from "../components/button/Button";
import { useParams, useSearchParams } from "react-router-dom";


const SetPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token")
    console.log('from search params', token)
    const dispatch = useDispatch()


    const [errors, setErrors] = useState([])
    const lang = useSelector(state => state.langFont.lang)

    const [pageText] = usePageText("setPassword")
    const INITIAL_DATA = {
        password: '',
        password_check: ''
    }

    //verify password and get user id from it


    return (
        <>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <ServerError msg={errors} />}
            <Formik
                initialValues={INITIAL_DATA}
                validationSchema={setPasswordSchema}
                onSubmit={async (values, { setSubmitting }) => {

                    setSubmitting(false)
                    try {
                        setErrors([])

                        const res = await AuthApi.setPassword(values.username, values.password)
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
                        label={pageText.PASSWORD}
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <TextInput
                        label={pageText.PASSWORD_CHECK}
                        name="password_check"
                        type="password"
                        placeholder=""
                    />

                    <Button btnText={pageText.SUBMIT} type="submit" />
                </Form>
            </Formik>
        </>
    );
};

export default SetPassword;
