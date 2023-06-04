import React, { useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch } from "react-redux";
import AuthApi from "../api/auth";
import { LOGIN } from "../reducers/actionTypes";
import InputError from "../components/common/InputError";
import { Formik, Form, ErrorMessage } from "formik"
import registerSchema from "../components/form/validation/registerSchema";
import { TextInput } from "../components/form/Fields";
import { Button } from "../components/button/Button";

const Register = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    const [pageText] = usePageText("register")
    const INITIAL_DATA = {
        username: '',
        password: '',
        password_check: '',
        email: ''
    }
    // const [formData, handleChange, resetFormData] = useFormData(INITIAL_DATA)

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const res = await AuthApi.register(formData.username, formData.password, formData.email)
    //         //call dispatch to set token in profileReducer
    //         console.log(res)
    //         dispatch({ type: LOGIN, token: res })
    //         resetFormData()
    //         setErrors(false)
    //     } catch (e) {
    //         console.log('error in handlesubmit, need to display this one', e)
    //         setErrors(e)
    //     }
    // }

    return (
        <>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <InputError msg={errors} />}
            <Formik
                initialValues={INITIAL_DATA}
                validationSchema={registerSchema}
                onSubmit={async (values, { setSubmitting }) => {

                    setSubmitting(false)
                    try {
                        const res = await AuthApi.register(values.username, values.password, values.email)
                        //call dispatch to set token in profileReducer
                        console.log(res)
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
                        label={pageText.EMAIL}
                        name="email"
                        type="email"
                        placeholder="" />

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

export default Register;
