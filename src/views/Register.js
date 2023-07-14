import React, { useState, useEffect } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch, useSelector } from "react-redux";
import AuthApi from "../api/auth";
import { LOGIN } from "../reducers/actionTypes";
import ServerError from "../components/form/ServerError";
import { Formik, Form, ErrorMessage } from "formik"
import registerSchema from "../components/form/validation/registerSchema";
import Input from "../components/form/Input";
import { Button } from "../components/button/Button";
import CTA from "../components/common/CTA";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSetToken from "../hooks/useSetToken";
import { actionLogin } from "../reducers/actionCreator";

const Register = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const token = useSelector(state => state.profile.token)

    const [pageText, lang] = usePageText("register")
    const INITIAL_DATA = {
        username: '',
        password: '',
        password_check: '',
        email: ''
    }

    useEffect(() => {
        if (token) {
            //should go to their dashboard
            navigate('/users/dashboard')
        }
    }, [token])


    return (
        <div className="mb-24">
            <CTA msg={pageText.CTA} msgBtn={pageText.CTA_BTN} btnLink={pageText.CTA_LINK} />
            <div className="mt-8 flex flex-col justify-center items-center mx-8">

                {Object.keys(errors).length > 0 && <ServerError msg={errors} title={pageText.ERROR_TITLE} />}
                {errors.length === 0 && <h1 className="text-center mb-[56px] text-mobile-header-2">{pageText.H1}</h1>}
                <Formik
                    initialValues={INITIAL_DATA}
                    validationSchema={registerSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log('submitting')

                        try {
                            setErrors([])
                            console.log(values)
                            console.log('submitting')
                            const res = await AuthApi.register(values.username, values.password, values.email, lang)
                            console.log('register res', res)
                            //call dispatch to set token in profileReducer
                            dispatch(actionLogin(res))
                            // console.log('token in local storage', window.localStorage.getItem("token"))
                            // navigate('/users/dashboard')

                        } catch (e) {
                            if (e instanceof TypeError) {
                                //means server is down
                                setErrors(["UNKNOWN"])
                            } else {

                                setErrors(e)
                            }
                        } finally {
                            setSubmitting(false)
                        }


                    }}
                >
                    {formik => {
                        return (
                            <Form className="flex flex-col w-full md:max-w-[500px]">
                                <Input
                                    label={pageText.USERNAME}
                                    name="username"
                                    type="text"
                                    placeholder={pageText.USERNAME_PLACEHOLDER}
                                />

                                <Input
                                    label={pageText.EMAIL}
                                    name="email"
                                    type="email"
                                    placeholder={pageText.EMAIL_PLACEHOLDER}
                                />

                                <Input
                                    label={pageText.PASSWORD}
                                    name="password"
                                    type="password"
                                    placeholder={pageText.PASSWORD_PLACEHOLDER}
                                />

                                <Input
                                    label={pageText.PASSWORD_CHECK}
                                    name="password_check"
                                    type="password"
                                    placeholder=""
                                />

                                <Button lang={lang} btnText={pageText.SUBMIT} type="submit" extraClasses="mt-12" isSubmitting={formik.isSubmitting} testid="registerBtn" />
                                <p className="mt-4 text-center text-gray-text">{pageText.ALREADY_ACCT} <span className="text-link hover:text-primary"><Link to="/login">{pageText.LOGIN_HERE}</Link></span></p>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
